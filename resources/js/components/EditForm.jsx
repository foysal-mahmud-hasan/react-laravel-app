import React, { useEffect, useState } from "react";
import { TextInput, Button, Box, Text } from '@mantine/core';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";

function EditForm() {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    const form = useForm({
        initialValues: {
            id: '',
            name: '',
            mobile: '',
            address: '',
            balance: ''
        },
        validate: {
            name: (value) => (value ? null : 'Name is required'),
            mobile: (value) => (value ? null : 'Mobile is required'),
            address: (value) => (value ? null : 'Address is required'),
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/edit-info/${id}`);
                const data = response.data.data;
                form.setValues({
                    id: data.id,
                    name: data.name || '',
                    mobile: data.mobile || '',
                    address: data.address || '',
                    balance: data.balance || '',
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
                setMessage('Error fetching data. Please try again.');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/update-info', values);
            setMessage(response.data.message);
            setErrors({});
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const openConfirmModal = () => {
        modals.openConfirmModal({
            title: <Text size="md">{t("FormConfirmationTitle")}</Text>,
            children: <Text size="sm">{t("FormConfirmationMessage")}</Text>,
            labels: { confirm: t('Submit'), cancel: t('Cancel') },
            confirmProps: { color: 'red.6' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handleSubmit(form.values),
        });
    };

    return (
        <Box m="auto" maw={400}>
            <form onSubmit={form.onSubmit(openConfirmModal)}>
                <TextInput
                    label="Name"
                    {...form.getInputProps('name')}
                    error={errors.name || form.errors.name}
                    required
                />
                <TextInput
                    label="Mobile"
                    {...form.getInputProps('mobile')}
                    error={errors.mobile || form.errors.mobile}
                    required
                />
                <TextInput
                    label="Address"
                    {...form.getInputProps('address')}
                    error={errors.address || form.errors.address}
                    required
                />
                <TextInput
                    label="Balance"
                    {...form.getInputProps('balance')}
                    error={errors.balance}
                />
                <Button type="submit" mt="md">
                    Submit
                </Button>
            </form>
            {message && <Text color="green">{message}</Text>}
        </Box>
    );
}

export default EditForm;