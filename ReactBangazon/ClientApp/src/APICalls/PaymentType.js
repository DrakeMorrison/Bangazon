﻿import axios from 'axios';

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/paymentTypes`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deletePaymentType = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`api/paymentTypes/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const postNewPaymentType = (newPaymentType) => {
    return new Promise((reslove, reject) => {
        axios
            .post(`api/paymentTypes/paymenttype`, newPaymentType)
            .then((res) => {
                reslove(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

    const updatePaymentType = (paymentType) => {
        return new Promise((resolve, reject) => {
            axios
                .put(`api/paymentTypes`, paymentType)
                .then(res => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

export default { getAllPaymentTypes, deletePaymentType, updatePaymentType, postNewPaymentType };
