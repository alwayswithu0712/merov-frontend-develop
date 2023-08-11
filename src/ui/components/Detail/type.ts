import { Account } from '../../../typings/account';
import { ButtonProps } from '../buttons/Button';
import { TableProps } from '../Table';
import { DescriptionProps } from '../Description';
import { InputProps } from '../inputs/Input';
import { InputCurrencyProps } from '../inputs/InputCurrency';
import { InputQuantityProps } from '../inputs/InputQuantity';
import { InputCopyProps } from '../inputs/InputCopy';
import { InputSelectProps } from '../inputs/InputSelect';

export interface DetailProps {
    imagesCarousel?: string[];
    textLeft?: string;
    leftFirstButton?: ButtonProps;
    leftSecondButton?: ButtonProps;
    textTitle?: string;
    textSubTitle?: string | null;
    account: Account;
    tableData?: TableProps['data'];
    descriptionData?: DescriptionProps;
    handleChatClick?: (() => Promise<void>) | null;
    inputData?: (InputProps & { error?: string }) | null;
    inputPriceData?: InputCurrencyProps | null;
    inputShippingData?: (InputCurrencyProps & { error?: string }) | null;
    inputShippingAddressData?: (InputSelectProps & { error?: string }) | null;
    inputServiceFeeData?: InputCurrencyProps | null;
    inputTotalData?: InputCurrencyProps | null;
    inputAmountData?: InputQuantityProps | null;
    inputShippingDurationData?: (Partial<InputSelectProps> & { error?: string }) | null;
    inputWallet?: InputCopyProps | null;
    rightFirstButton?: ButtonProps | null;
    rightSecondButton?: ButtonProps | null;
    showContactUs?: boolean;
    idProductForRelatedProducts?: string;
    showVerifyIdentity?: boolean;
}
