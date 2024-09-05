import React, { useEffect, useState } from "react";
import { TextInput, Button, Box, Text, ActionIcon, Group, Menu, rem } from '@mantine/core';
import axios from 'axios';
import { DataTable } from 'mantine-datatable';
import tableCss from '../../css/Table.module.css'
import {
    IconEdit, IconTrash, IconCheck,
    IconDotsVertical,
    IconTrashX
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";


const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        balance: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 50;

    const { t, i18n } = useTranslation();
    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.get(`delete-info/${id}`);
            console.log(response)
            setMessage(response.data.message);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/get-data');
                setData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data : ", error)
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('/save-signup', formData);
            console.log(response)
            setMessage(response.data.message);
            setFormData({ name: '', mobile: '', address: '', balance: '' });
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <>
            <Box m="auto" maw={400}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />
                    <TextInput
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        error={errors.mobile}
                        required
                    />
                    <TextInput
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                    <TextInput
                        label="Balance"
                        name="balance"
                        value={formData.balance}
                        onChange={handleChange}
                        error={errors.balance}
                    />
                    <Button type="submit" mt="md">
                        Submit
                    </Button>
                </form>
                {message && <Text color="green">{message}</Text>}

                {data &&
                    <DataTable
                        classNames={{
                            root: tableCss.root,
                            table: tableCss.table,
                            header: tableCss.header,
                            footer: tableCss.footer,
                            pagination: tableCss.pagination,
                        }}
                        records={data}
                        columns={[
                            {
                                accessor: 'index',
                                title: t('S/N'),
                                textAlignment: 'right',
                                render: (item) => (data.indexOf(item) + 1)
                            },
                            { accessor: 'name', title: t("Name") },
                            { accessor: 'address', title: t("Address") },
                            // {
                            //     accessor: 'status',
                            //     title: t("Status"),
                            //     render: (data) => (
                            //         data.status == 1 ? 'Active' : 'Inactive'
                            //     )
                            // },
                            { accessor: 'mobile', title: t("Mobile") },
                            {
                                accessor: "action",
                                title: t("Action"),
                                textAlign: "right",
                                render: (data) => (
                                    <Group gap={4} justify="right" wrap="nowrap">
                                        <Menu position="bottom-end" offset={3} withArrow trigger="hover" openDelay={100} closeDelay={400}>
                                            <Menu.Target>
                                                <ActionIcon size="sm" variant="outline" color="red" radius="xl" aria-label="Settings">
                                                    <IconDotsVertical height={'18'} width={'18'} stroke={1.5} />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item
                                                    onClick={() => {
                                                        // dispatch(setInsertType('update'))
                                                        // dispatch(editEntityData('inventory/category-group/' + data.id))
                                                        // dispatch(setFormLoading(true))
                                                        // navigate(`/inventory/category/${data.id}`)
                                                        navigate(`/edit/${data.id}`)
                                                    }}
                                                >
                                                    {t('Edit')}
                                                </Menu.Item>
                                                <Menu.Item
                                                    target="_blank"
                                                    component="a"
                                                    w={'200'}
                                                    mt={'2'}
                                                    bg={'red.1'}
                                                    c={'red.6'}
                                                    onClick={() => {
                                                        modals.openConfirmModal({
                                                            title: (
                                                                <Text size="md"> {t("FormConfirmationTitle")}</Text>
                                                            ),
                                                            children: (
                                                                <Text size="sm"> {t("FormConfirmationMessage")}</Text>
                                                            ),
                                                            labels: { confirm: 'Confirm', cancel: 'Cancel' },
                                                            confirmProps: { color: 'red.6' },
                                                            onCancel: () => console.log('Cancel'),
                                                            onConfirm: handleDelete(data.id)
                                                        });
                                                    }}
                                                    rightSection={<IconTrashX style={{ width: rem(14), height: rem(14) }} />}
                                                >
                                                    {t('Delete')}
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Group>
                                ),
                            },
                        ]
                        }
                        // fetching={fetching}
                        // totalRecords={indexData.total}
                        recordsPerPage={perPage}
                        page={page}
                        onPageChange={(p) => {
                            setPage(p)
                            dispatch(setFetching(true))
                        }}
                        loaderSize="xs"
                        loaderColor="grape"
                        height={400}
                        scrollAreaProps={{ type: 'never' }}
                    />
                }
            </Box>
        </>
    );
};

export default SignupForm;