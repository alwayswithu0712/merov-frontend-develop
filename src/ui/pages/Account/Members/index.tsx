import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { notification } from 'antd';
import Button, { SIZE } from '../../../components/buttons/Button';
import { User, Auth0User } from '../../../../typings/user';
import Pagination from '../../../components/Pagination';
import { useSearchParamsState } from '../../../../hooks/useSearchParamsState';
import { PageQuery } from '../../../../typings/pageQuery';
import EditMember from '../modals/EditMember';
import COLORS from '../../../foundation/colors';
import AddMember from '../modals/AddMember';
import PencilLogo from '../../../../assets/icons/PencilLogo';
import CloseLogo from '../../../../assets/icons/CloseLogo';
import Table, { VARIANT } from '../../../components/Table';
import merovService from '../../../../services/merov';
import RemoveMember from '../modals/RemoveMember';

const tableHead = ['Full Names', 'Email', 'Status', '', ''];

export default function Members({ members, user }: { members: User[]; user: Auth0User }) {
    const [memberSelected, setMemberSelected] = useState<User>();
    const [membersToShow, setMembersToShow] = useState<User[]>(members);
    const [openAddMemberModal, setOpenAddMemberModal] = useState<boolean>(false);
    const [openEditMemberModal, setOpenEditMemberModal] = useState<boolean>(false);
    const [openRemoveMemberModal, setOpenRemoveMemberModal] = useState<boolean>(false);
    const [userDeleted, setUserDeleted] = useState<boolean>(false);
    const [params, setParams] = useSearchParamsState<PageQuery>({
        take: 12,
        skip: 0,
        sort: 'price_asc',
    });
    const [page, setPage] = useState(0);

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
        setPage(page);
    };

    const handleOpenAddMember = () => {
        setOpenAddMemberModal(true);
    };

    const handleOpenEditMember = (member: User) => {
        setMemberSelected(member);
        setOpenEditMemberModal(true);
    };

    const handleOpenRemoveMember = (member: User) => {
        setMemberSelected(member);
        setOpenRemoveMemberModal(true);
    };

    useEffect(() => {
        merovService
            .secureApi()
            .getMembers()
            .then((membersData) => {
                setMembersToShow(membersData);
            })
            .catch(() => {
                notification.open({
                    message: 'Troubles get members!',
                    className: 'error',
                });
            });
    }, [userDeleted]);

    const isOwnProduct = (id: string) => user['https://merov.io/userId'] === id;

    const getTableData = (itemsPerPage) => {
        const rowsForTable = membersToShow.slice(0, itemsPerPage).map((member) => {
            const columnsForTable: any[] = [
                `${member.firstName && member.lastName ? `${member.firstName} ${member.lastName}` : ''}`,
                member.email,
                member.idVerificationStatus,
                <>
                    {isOwnProduct(member.id) ? (
                        <div className="w-24" />
                    ) : (
                        <div className="flex cursor-pointer items-center w-24 m-auto" onClick={() => handleOpenEditMember(member)}>
                            <PencilLogo color={COLORS.GREEN} />
                            <IconText style={{ color: `${COLORS.GREEN}` }}>Edit</IconText>
                        </div>
                    )}
                </>,
                <>
                    {isOwnProduct(member.id) ? (
                        <div className="w-24" />
                    ) : (
                        <div className="flex cursor-pointer items-center w-24 m-auto" onClick={() => handleOpenRemoveMember(member)}>
                            <CloseLogo color={COLORS.GREEN} />
                            <IconText>Remove</IconText>
                        </div>
                    )}
                </>,
            ];
            return { data: columnsForTable };
        });
        return rowsForTable;
    };

    return (
        <div className="w-full">
            <div className="flex justify-end mt-2 mb-4">
                <Button onClick={() => handleOpenAddMember()} size={SIZE.SMALL} bold>
                    Add member
                </Button>
            </div>
            {membersToShow ? (
                <div className="mt-8 flex flex-col">
                    <Table
                        className={`bg-[${COLORS.BACKGROUNDGREYTWO}]`}
                        data={getTableData(params.take)}
                        variant={VARIANT.VERTICAL}
                        tableHead={tableHead}
                    />

                    <div className="mt-8">
                        <Pagination
                            onPaginationChange={onPaginationChange}
                            pageCount={Math.ceil(membersToShow.length / params.take)}
                            currentPage={page}
                            pageSize={Number(params.take)}
                            onPageSizeChange={(e) => {
                                setParams({ ...params, skip: 0, take: e });
                            }}
                        />
                    </div>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
            {!!memberSelected && (
                <>
                    <EditMember visible={openEditMemberModal} memberId={memberSelected.id} setVisible={setOpenEditMemberModal} />
                    <RemoveMember
                        visible={openRemoveMemberModal}
                        memberId={memberSelected.id}
                        setVisible={setOpenRemoveMemberModal}
                        setUserDeleted={setUserDeleted}
                    />
                </>
            )}
            <AddMember visible={openAddMemberModal} setVisible={setOpenAddMemberModal} />
        </div>
    );
}

const IconText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    font-size: 14px;
    line-height: 14px;
    margin: 0px;
    margin-left: 8px;
`;
