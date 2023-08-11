import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { Form, notification } from 'antd';
import useSWR from 'swr';
import Input from '../../components/inputs/Input';
import InputCurrency from '../../components/inputs/InputCurrency';
import useUploadProductContainer from '../../../hooks/useUploadProductContainer';
import NumberValidator from '../../../helpers/validators/NumberValidator';
import StringValidator from '../../../helpers/validators/StringValidator';
import { ICreateProduct, IUpdateProduct, Product } from '../../../typings/product';
import { supportedCurrencies } from '../../../services/blockchain';
import SuccessModal from './modals/SuccessModal';
import merovService from '../../../services/merov';
import DeleteItemsModal from '../../components/modals/DeleteItemModal';
import AddWalletModal from '../../components/modals/AddWalletModal';
import * as walletHelper from '../../../helpers/wallet';
import UploadPhoto from '../../components/UploadPhoto';
import CurrenciesData from '../../../data/currencies';
import { Category, Subcategory } from '../../../typings/category';
import ConfirmUpdateModal from './modals/ConfirmUpdateModal';
import { SuggestionsInputCustom } from '../../components/inputs/SuggestionsInputCustom';
import Button, { SIZE } from '../../components/buttons/Button';
import CheckboxCustom from '../../components/inputs/CheckboxCustom';
import Title from '../../components/Title';
import { Currency } from '../../../typings/currency';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';
import { STATUS, User } from '../../../typings/user';
import AuthorizedUserModal from '../../components/modals/AuthorizedUserModal';
import isFromUSA from '../../../helpers/isFromUSA';
import InputSelect, { Option } from '../../components/inputs/InputSelect';
import InputWithSelect from '../../components/inputs/InputWithSelect';
import AddAddressModal from '../../components/modals/AddAddressModal';
import { DeliveryAddress } from '../../../typings/deliveryAddress';
import Textarea from '../../components/inputs/Textarea';
import COLORS from '../../foundation/colors';
import { WeightUnits, DimensionUnits } from '../../../typings/unit';
import { usePermissionVerifier } from '../../../hooks/usePermissionVerifier';
import { Permission } from '../../../typings/permissions';

interface ProductFormProps {
    item?: Product;
    categories: Category[];
    user: User;
}

const initialErrorFields = {
    title: false,
    description: false,
    wallet: false,
    currency: false,
    price: false,
    stock: false,
    categoryId: false,
    subcategoryId: false,
    brand: false,
    model: false,
    condition: false,
    maxTestingTime: false,
    photo: false,
    height: false,
    width: false,
    length: false,
    dimensionsUnit: false,
    weight: false,
    weightUnit: false,
    deliveryAddressId: false,
};

export default function UploadProduct({ item, categories, user }: ProductFormProps) {
    const conditionTypes = ['New', 'Used', 'Refurbished'];
    const isUpdateMode = !!item?.id;
    const [disableCurrency, setDisableCurrency] = useState<boolean>(!item);

    const [productData, setProductData] = useState<IUpdateProduct>({ ...item });
    const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false);

    const initialImages = item?.images ? item.images : [];
    const [imgList, setImageList] = useState<any[]>(initialImages);
    const [currencySelect, setCurrencySelect] = useState<string[]>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openAuthorizedModal, setOpenAuthorizedModal] = useState<boolean>(false);
    const [productRes, setProductRes] = useState<any>();
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [addWalletModal, setAddWalletModal] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
    const [modalAddress, setModalAddress] = useState<boolean>(false);

    const { hasPermissions } = usePermissionVerifier([Permission.Addresses, Permission.Wallets]);

    const { checkPrice, checkStock, checkTestingDays, checkProductMeasures } = NumberValidator();
    const { TitleValidator, DescriptionVlidator } = StringValidator();
    const { tableProps } = useUploadProductContainer(productData, setProductData);

    const [brands, setBrands] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);

    const { errors, handleOnFinishFormErrors, handleSetError } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    useEffect(() => {
        if (!item) {
            setProductData((prevState) => ({ ...prevState, weightUnit: WeightUnits[0], dimensionsUnit: DimensionUnits[0] }));
        }
    }, []);

    useEffect(() => {
        form.setFieldsValue(productData);
        form.setFieldsValue({
            wallet: productData.sellerAddress && walletHelper.toShortStringWithChain(productData.sellerAddress, productData.chain),
        });
    }, [form, productData, errors]);

    useEffect(() => {
        if (user.idVerificationStatus !== STATUS.Full) {
            setOpenAuthorizedModal(true);
        }
    }, []);

    useEffect(() => {
        if (isUpdateMode) {
            setCurrencySelect(supportedCurrencies(productData.chain).map((item) => item.name));
        }
    }, [isUpdateMode, productData.chain]);

    const { data: addresses, mutate: updateAddresses } = useSWR('/addresses', merovService.secureApi().getAddresses);

    const handleCancelAuthorizationModel = () => {
        Router.back();
    };

    const handleChangeData = useCallback((e, nameField) => {
        handleSetError(nameField, false);
        setProductData((prevItemData) => ({ ...prevItemData, [nameField]: e }));
    }, []);

    const areSameImages = (): boolean => {
        const productImages = item?.images ? item?.images : [];
        const formImages = imgList;
        if (!productImages || !formImages) return false;
        if (productImages.length !== formImages.length) return false;
        return productImages.every((image) => formImages.includes(image));
    };

    const areChangesImportantFields = () => productData.title !== item?.title || productData.description !== item?.description;

    const { data: wallets, mutate: updateWallets } = useSWR('/wallets', merovService.secureApi().getMyWallets);

    if (!wallets) return null;

    const onFinish = async () => {
        if (loading) return;
        setConfirmUpdate(false);
        setLoading(true);
        const product: IUpdateProduct = {
            currency: productData.currency,
            price: Number(productData.price),
            chain: productData.chain!!,
            stock: Number(productData.stock),
            sellerAddress: productData.sellerAddress!!,
            categoryId: productData.categoryId!!,
            subcategoryId: productData.subcategoryId!!,
            condition: productData.condition,
            maxTestingTime: Number(productData.maxTestingTime),
            brand: productData.brand ?? undefined,
            model: productData?.model ?? undefined,
            published: productData?.published ?? true,
            height: Number(productData.height),
            length: Number(productData.length),
            width: Number(productData.width),
            weight: Number(productData.weight),
            dimensionsUnit: productData.dimensionsUnit,
            weightUnit: productData.weightUnit,
            deliveryAddressId: productData.deliveryAddressId,
        };
        if (areChangesImportantFields() || !areSameImages()) {
            product.title = productData.title;
            product.description = productData.description;
            product.images = imgList;
        }

        try {
            const response = isUpdateMode
                ? await merovService.secureApi().updateProduct(item.id, product)
                : await merovService.secureApi().postProduct(product as ICreateProduct);

            if (!isUpdateMode) {
                setProductRes(response);
                setOpenModal(true);
                setImageList([]);
                form.resetFields();
            } else {
                notification.open({
                    description: 'Changes saved!',
                    message: undefined,
                    className: 'success',
                });
            }
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error uploading product',
                className: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCondition = (condition: any) => {
        const cloneUserData = { ...productData };
        setProductData({ ...cloneUserData, condition });
        handleSetError('condition', false);
    };

    const handleChangeWallet = (option: any) => {
        if (option !== 'Add Wallet') {
            const walletSelected = wallets.find((wallet) => wallet.address === option);
            if (walletSelected) {
                handleSetError('wallet', false);
                setCurrencySelect(supportedCurrencies(walletSelected.chain).map((item) => item.name));
                setDisableCurrency(false);
                setProductData((prevState) => ({
                    ...prevState,
                    chain: walletSelected.chain,
                    currency: '',
                    sellerAddress: walletSelected.address,
                }));
            }
        }
    };

    const handleCategoryChange = async (categoryId: string) => {
        handleChangeData(categoryId, 'categoryId');
        setProductData((prevState) => ({
            ...prevState,
            subcategoryId: undefined,
        }));
    };

    const handleSubcategoryChange = async (subcategoryId: string) => {
        handleChangeData(subcategoryId, 'subcategoryId');
        const category = categories.find((c) => c.id === productData.categoryId);
        if (category?.fields?.brand) {
            const brands = await merovService
                .secureApi()
                .getBrands({ categoryId: productData.categoryId as string, subcategoryId, take: 99999 });
            setBrands(brands.response.map((b) => b.name));
        }
    };

    const handleChangeUnit = async (value: string, nameField: string) => {
        handleChangeData(value, nameField);
        setProductData((prevItemData) => ({ ...prevItemData, [nameField]: value }));
    };

    const handleBrandChange = async (brand: string) => {
        handleChangeData(brand, 'brand');
        const category = categories.find((c) => c.id === productData.categoryId);
        if (brand && category?.fields?.model) {
            const models = await merovService.secureApi().getModels({
                categoryId: productData.categoryId as string,
                subcategoryId: productData.subcategoryId as string,
                brand,
                take: 99999,
            });
            setModels(models.response.map((m) => m.name));
        }
    };

    const handleDelete = async () => {
        setStateModal(true);
    };

    const addNewWallet = (newWallet: any) => {
        updateWallets();
        setProductData((prevState) => ({
            ...prevState,
            chain: newWallet.chain,
            sellerAddress: newWallet.address,
        }));

        form.setFieldsValue({ wallet: walletHelper.toShortStringWithChain(newWallet.address, newWallet.chain) });
        setCurrencySelect(supportedCurrencies(newWallet.chain).map((item) => item.name));
        setDisableCurrency(false);
        setAddWalletModal(false);
    };

    const onCloseAddWalletModal = () => {
        setAddWalletModal(false);
        if (productData.sellerAddress && productData.chain) {
            form.setFieldsValue({
                wallet: walletHelper.toShortStringWithChain(productData.sellerAddress, productData.chain),
            });
        }
    };

    const validateImg = () => {
        if (imgList.length > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(`Photo is required!`));
    };

    const inputShippingAddressData = {
        disabled: !user.id,
        value: productData.deliveryAddressId,
        error: productData.deliveryAddressId ? productData.deliveryAddressId : '',
        customValue: productData.deliveryAddressId,
        onChange: (option) => {
            setProductData((prevState) => ({
                ...prevState,
                deliveryAddressId: option.value,
            }));
            handleSetError('deliveryAddressId', false);
        },
        options: [
            ...(addresses
                ? addresses.map((address: DeliveryAddress) => ({
                      value: address.id,
                      label: `${address.country}, ${address.city},  ${address.street}`,
                  }))
                : []),
            ...(hasPermissions(Permission.Addresses)
                ? [
                      {
                          value: 'Add Address',
                          label: 'Add Address',
                          notSelectable: true,
                          onClick: () => setModalAddress(true),
                      },
                  ]
                : []),
        ],
    };

    return (
        <div className="container mb-6">
            <Title text={`${isUpdateMode ? `Update` : `List`} your Product`} className="mb-8 text-3xl" />
            <div className="updateForm animate__animated animate__fadeIn animate__faster flex w-full justify-center m-auto">
                <Form
                    form={form}
                    className={`w-full text-white max-w-3xl bg-[${COLORS.GREEN}]`}
                    name="basic"
                    size="large"
                    onFinish={() =>
                        isUpdateMode &&
                        item.approved &&
                        user.idVerificationStatus !== STATUS.Full &&
                        (areChangesImportantFields() || !areSameImages())
                            ? setConfirmUpdate(item.approved)
                            : onFinish()
                    }
                    onFinishFailed={handleOnFinishFormErrors}
                    layout="vertical"
                    labelCol={{
                        span: 20,
                    }}
                >
                    <div className=" px-6 ">
                        <div className="py-6 text-xl font-medium ">Product Information </div>
                        <Form.Item
                            name="title"
                            label="Title"
                            validateTrigger="onChange"
                            rules={[
                                {
                                    validator: (e, a) => TitleValidator(a, handleSetError),
                                },
                            ]}
                        >
                            <Input {...tableProps.data[0]} hasError={errors.title} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            validateTrigger="onChange"
                            rules={[
                                {
                                    validator: (e, a) => DescriptionVlidator(a, 'description', handleSetError),
                                },
                            ]}
                        >
                            <Textarea
                                className={'h-36'}
                                onChange={(e) => handleChangeData(e.target.value, 'description')}
                                hasError={errors.description}
                            />
                        </Form.Item>
                        <div className="w-full grid grid-cols-1  md:grid-cols-2  grid-rows-1 gap-4 grid-flow-row-dense justify-center">
                            <div className="col-span-1">
                                <Form.Item
                                    name="wallet"
                                    validateTrigger="onChange"
                                    rules={[{ required: true, message: 'Wallet is required!' }]}
                                >
                                    <InputSelect
                                        hasError={errors.wallet}
                                        name="wallet"
                                        customValue={productData.sellerAddress}
                                        placeholder="Select Wallet"
                                        label="Wallet Address"
                                        onChange={(option: Option) => handleChangeWallet(option.value)}
                                        options={[
                                            ...(hasPermissions(Permission.Wallets)
                                                ? [
                                                      {
                                                          value: 'Add Wallet',
                                                          label: 'Add Wallet',
                                                          notSelectable: true,
                                                          onClick: () => setAddWalletModal(true),
                                                      },
                                                  ]
                                                : []),
                                            ...(wallets
                                                ? wallets.map((item: any) => ({
                                                      label: walletHelper.toShortStringWithChain(item.address, item.chain),
                                                      value: item.address,
                                                  }))
                                                : []),
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="currency"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Currency is required',
                                        },
                                    ]}
                                >
                                    <InputSelect
                                        hasError={errors.currency}
                                        name="currency"
                                        placeholder="Select Currency"
                                        value={productData.currency}
                                        label="Currency"
                                        disabled={disableCurrency}
                                        dontDisableLabel={true}
                                        onChange={(option: any) => handleChangeData(option.value, 'currency')}
                                        options={[
                                            ...currencySelect.map((item) => ({
                                                value: item,
                                                label: (
                                                    <div className="flex gap-2">
                                                        {CurrenciesData[item].getImg()}
                                                        {item}
                                                    </div>
                                                ),
                                            })),
                                        ]}
                                        noOptionLabel="No currency available"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1  md:grid-cols-2  grid-rows-1 gap-4 grid-flow-row-dense justify-center">
                            <div className="col-span-1">
                                <Form.Item
                                    name="price"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            validator: (e, a) => checkPrice(a, form.getFieldValue('currency') as Currency),
                                        },
                                    ]}
                                >
                                    <InputCurrency
                                        {...tableProps.data[1]}
                                        currencyData={{ currency: productData.currency as Currency, price: productData.price }}
                                        hasError={form.getFieldError('price').length > 0}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="stock"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            validator: (e, a) => checkStock(a, undefined, 'stock', handleSetError),
                                        },
                                    ]}
                                >
                                    <Input type="number" {...tableProps.data[2]} hasError={errors.stock} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1  md:grid-cols-2  grid-rows-1 gap-4 grid-flow-row-dense justify-center">
                            <div className="col-span-1">
                                <Form.Item
                                    name="categoryId"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Category is required',
                                        },
                                    ]}
                                >
                                    <InputSelect
                                        hasError={errors.categoryId}
                                        name="categoryId"
                                        placeholder="Select Category"
                                        label="Category"
                                        onChange={(option: any) => handleCategoryChange(option.value)}
                                        noOptionLabel="No category available"
                                        options={[
                                            ...(categories.length > 0
                                                ? categories.map((category: Category) => ({
                                                      label: category.name,
                                                      value: category.id,
                                                  }))
                                                : []),
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="subcategoryId"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Subcategory is required',
                                        },
                                    ]}
                                >
                                    <InputSelect
                                        hasError={errors.subcategoryId}
                                        disabled={!productData.categoryId}
                                        dontDisableLabel={true}
                                        value={productData.subcategoryId}
                                        name="subcategoryId"
                                        placeholder="Select Subcategory"
                                        label="Subcategory"
                                        onChange={(option: any) => handleSubcategoryChange(option.value)}
                                        noOptionLabel="No subcategory available"
                                        options={[
                                            ...(categories
                                                .find((c) => c.id === productData.categoryId)
                                                ?.subcategories.map((subcategory: Subcategory) => ({
                                                    label: subcategory.name,
                                                    value: subcategory.id,
                                                })) || []),
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            {categories.find((c) => c.id === productData.categoryId)?.fields?.brand && (
                                <div className="col-span-1">
                                    <Form.Item name="brand" validateTrigger="onChange">
                                        <SuggestionsInputCustom
                                            id="brands"
                                            className="select_custom"
                                            options={brands.map((brand) => ({
                                                value: brand,
                                            }))}
                                            label="Brand"
                                            onChange={(brand: string) => {
                                                handleBrandChange(brand);
                                            }}
                                            placeholder="Select Brand"
                                            disabled={!productData.subcategoryId}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                            {categories.find((c) => c.id === productData.categoryId) && (
                                <div className="col-span-1">
                                    <Form.Item name="model" validateTrigger="onChange">
                                        <SuggestionsInputCustom
                                            id="models"
                                            className="select_custom"
                                            placeholder="Select Model"
                                            label="Model"
                                            disabled={!productData.subcategoryId}
                                            onChange={(model: string) => {
                                                handleChangeData(model, 'model');
                                            }}
                                            options={models.map((model) => ({
                                                value: model,
                                            }))}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                        </div>
                        <div className="w-full grid grid-cols-1  md:grid-cols-2  grid-rows-1 gap-4 grid-flow-row-dense justify-center">
                            <div className="col-span-1">
                                <Form.Item
                                    name="condition"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Condition is required',
                                        },
                                    ]}
                                >
                                    <InputSelect
                                        hasError={errors.condition}
                                        value={productData.condition}
                                        name="condition"
                                        placeholder="Select Condition"
                                        label="Condition"
                                        onChange={(option: any) => handleChangeCondition(option.value)}
                                        noOptionLabel="No condition available"
                                        options={[
                                            ...(conditionTypes?.map((item) => ({
                                                label: item,
                                                value: item,
                                            })) || []),
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="maxTestingTime"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            validator: (e, a) => checkTestingDays(a, 'max', productData.maxTestingTime, handleSetError),
                                        },
                                    ]}
                                >
                                    <Input type="number" {...tableProps.data[7]} hasError={errors.maxTestingTime} />
                                </Form.Item>
                            </div>
                            <div className="w-full py-6">
                                <div className="flex justify-start">
                                    <div className="inline">
                                        <CheckboxCustom
                                            onChange={() => {
                                                handleChangeData(
                                                    Object.prototype.hasOwnProperty.call(productData, 'published')
                                                        ? !productData.published
                                                        : false,
                                                    'published',
                                                );
                                            }}
                                            name="visibility"
                                            className="offer-product-form-inline"
                                            checked={
                                                Object.prototype.hasOwnProperty.call(productData, 'published')
                                                    ? !productData.published
                                                    : false
                                            }
                                            defaultChecked={true}
                                        />
                                    </div>

                                    <div className="inline ml-2 text-base">Set product as private</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 mt-6 ">
                        <div className="flex justify-center w-full ">
                            <div className="w-full border-b border-solid border-[#3b3939]"></div>
                        </div>
                        <div className="py-8  text-xl font-medium ">Shipping Details </div>

                        {inputShippingAddressData && (
                            <Form.Item
                                name="deliveryAddressId"
                                validateTrigger="onSubmit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Address is required',
                                    },
                                ]}
                            >
                                <InputSelect
                                    label="Ship from"
                                    placeholder="Select ship address"
                                    onChange={inputShippingAddressData.onChange}
                                    value={inputShippingAddressData.value}
                                    options={inputShippingAddressData.options}
                                    disabled={inputShippingAddressData.disabled}
                                    hasError={errors.deliveryAddressId}
                                />
                            </Form.Item>
                        )}

                        <div className="w-full grid grid-cols-1  md:grid-cols-2  grid-rows-2 gap-4 grid-flow-row-dense justify-center">
                            <div className="col-span-1">
                                <Form.Item
                                    name="height"
                                    validateTrigger="onSubmit"
                                    rules={[
                                        {
                                            validator: (e, a) => checkProductMeasures(parseFloat(a), 'height', handleSetError),
                                        },
                                    ]}
                                >
                                    <InputWithSelect
                                        id="dimensionsUnit"
                                        name="dimensionsUnit"
                                        defaultValue="cm"
                                        disabled={false}
                                        placeholder="Select option"
                                        selectValue={productData.dimensionsUnit}
                                        onChange={(value: string) => handleChangeUnit(value, 'dimensionsUnit')}
                                        hasError={form.getFieldError('height').length > 0}
                                        inputProps={tableProps.data[9]}
                                        selectOptions={DimensionUnits}
                                    ></InputWithSelect>
                                </Form.Item>
                            </div>

                            <div className="col-span-1">
                                <Form.Item
                                    name="length"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            validator: (e, a) => checkProductMeasures(parseFloat(a), 'length', handleSetError),
                                        },
                                    ]}
                                >
                                    <InputWithSelect
                                        id="dimensionsUnit"
                                        name="dimensionsUnit"
                                        defaultValue="cm"
                                        disabled={false}
                                        placeholder="Select option"
                                        selectValue={productData.dimensionsUnit}
                                        onChange={(value: string) => handleChangeUnit(value, 'dimensionsUnit')}
                                        hasError={form.getFieldError('length').length > 0}
                                        inputProps={tableProps.data[10]}
                                        selectOptions={DimensionUnits}
                                    ></InputWithSelect>
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="width"
                                    validateTrigger="onSubmit"
                                    rules={[
                                        {
                                            validator: (e, a) => checkProductMeasures(parseFloat(a), 'width', handleSetError),
                                        },
                                    ]}
                                >
                                    <InputWithSelect
                                        id="dimensionsUnit"
                                        name="dimensionsUnit"
                                        defaultValue="cm"
                                        disabled={false}
                                        placeholder="Select option"
                                        selectValue={productData.dimensionsUnit}
                                        onChange={(value: string) => handleChangeUnit(value, 'dimensionsUnit')}
                                        hasError={form.getFieldError('width').length > 0}
                                        inputProps={tableProps.data[11]}
                                        selectOptions={DimensionUnits}
                                    ></InputWithSelect>
                                </Form.Item>
                            </div>
                            <div className="col-span-1">
                                <Form.Item
                                    name="weight"
                                    validateTrigger="onSubmit"
                                    rules={[
                                        {
                                            validator: (e, a) => checkProductMeasures(parseFloat(a), 'weight', handleSetError),
                                        },
                                    ]}
                                >
                                    <InputWithSelect
                                        id="weightUnit"
                                        name="weightUnit"
                                        defaultValue="g"
                                        disabled={false}
                                        placeholder="Select option"
                                        selectValue={productData.weightUnit}
                                        onChange={(value: string) => handleChangeUnit(value, 'weightUnit')}
                                        hasError={form.getFieldError('weight').length > 0}
                                        inputProps={tableProps.data[12]}
                                        selectOptions={WeightUnits}
                                    ></InputWithSelect>
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 mt-6">
                        <div className="flex justify-center w-full ">
                            <div className="w-full border-b border-solid border-[#3b3939]"></div>
                        </div>
                        <div className="py-8  text-xl font-medium ">Photos </div>
                        <div className="row">
                            <div className="w-full mt-5">
                                <Form.Item
                                    name="photo"
                                    className="h-[130px]"
                                    validateTrigger="onChange"
                                    rules={[
                                        {
                                            validator: () => validateImg(),
                                        },
                                    ]}
                                >
                                    <UploadPhoto setIsLoadingImage={setIsLoadingImage} imgList={imgList} setImageList={setImageList} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <Form.Item>
                        <div className="flex mt-8 h-14 px-6">
                            {isUpdateMode && (
                                <div onClick={handleDelete} className="uploadForm-delete-icon eller-btns-row address-data d-flex ">
                                    <i className="seller-icon-margin ri-delete-bin-6-fill upload-remove-img"></i>
                                </div>
                            )}
                            <Button disabled={isLoadingImage || loading} size={SIZE.MEDIUM} type="submit" loading={loading}>
                                {isUpdateMode ? 'Update' : 'Post'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <SuccessModal product={productRes} setOpenModal={setOpenModal} openModal={openModal} />
                {item?.id && <DeleteItemsModal stateModal={stateModal} setStateModal={setStateModal} id={item?.id} />}

                <ConfirmUpdateModal stateModal={confirmUpdate} setStateModal={setConfirmUpdate} updateFunction={onFinish} />

                <AddWalletModal addWalletModal={addWalletModal} onCloseAddWalletModal={onCloseAddWalletModal} addNewWallet={addNewWallet} />
                <AuthorizedUserModal
                    canVerify={isFromUSA(user.phone)}
                    stateModal={openAuthorizedModal}
                    setStateModal={setOpenAuthorizedModal}
                    onCancel={handleCancelAuthorizationModel}
                    text="Please verify your identity to sell a product."
                />
            </div>
            <AddAddressModal
                addMode={true}
                deliveryAddress={null}
                visible={modalAddress}
                setVisible={() => {
                    updateAddresses();
                    setModalAddress(false);
                    inputShippingAddressData.onChange({ value: productData.deliveryAddressId });
                }}
            />
        </div>
    );
}
