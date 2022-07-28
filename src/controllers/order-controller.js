'use strict'

const ValidationContract = require('../validators/fluent-validator')
const _orderRepository = require('../repositories/order-repository')

exports.get = async (req, res, next) => {
    try {
        var data = await _orderRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            data: e,
            message: 'Falha ao buscar o pedido',
        });
    }
};

exports.post = async (req, res, next) => {

    // ValidationContract.hasMinLen(req.body.number, 3, 'O nome deve conter pelo menos 3 caracteres')
    // ValidationContract.isEmail(req.body.createDate, 'Email Invalido')
    // ValidationContract.hasMinLen(req.body.status, 6, 'A senha deve conter pelo menos 6 caracteres')
    // ValidationContract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    // Se os dados forem invalidos
    // if (!ValidationContract.isValid()) {
    //     res.status(400).send(ValidationContract.errors()).end();
    //     ValidationContract.clear();
    //     return;
    // }

    try {
        const data = await _orderRepository.create(req.body);
        res.status(201).send({
            message: 'Pedido criado com sucesso'
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao criar o pedido',
            data: e
        });
    }
};