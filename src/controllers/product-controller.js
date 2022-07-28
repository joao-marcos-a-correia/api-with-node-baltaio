'use strict'

const ValidationContract = require('../validators/fluent-validator')
const _productRepository = require('../repositories/product-repository')


exports.get = async (req, res, next) => {
    try {
        var data = await _productRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            data: e,
            message: 'Falha ao buscar o produto',
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    const slug = req.params.slug;

    try {
        const data = await _productRepository.getBySlug(slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            data: e,
            message: 'Falha ao buscar o produto',
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await _productRepository.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            data: e,
            message: 'Falha ao buscar o produto',
        });
    }
};

exports.getByTag = async (req, res, next) => {
    const tag = req.params.tag;

    try {
        const data = _productRepository.getByTag(tag)
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            data: e,
            message: 'Falha ao buscar o produto',
        });
    }
};

exports.post = async (req, res, next) => {

    ValidationContract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    ValidationContract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
    ValidationContract.hasMinLen(req.body.description, 3, 'A descriçao deve conter pelo menos 3 caracteres')

    // Se os dados forem invalidos
    if (!ValidationContract.isValid()) {
        res.status(400).send(ValidationContract.errors()).end();
        ValidationContract.clear();
        return;
    }

    try {
        const data = await _productRepository.create(req.body)
        res.status(201).send({
            id: x.id,
            data: data,
            message: 'Produto cadastrado com sucesso'
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    const id = req.params.id;

    try {
        const data = await _productRepository.update(id, req.body)
        res.status(200).send({
            data: data,
            message: "Produto atualizado com sucesso!"
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao atualizar o produto',
            data: e
        });

    }
};

exports.delete = async (req, res, next) => {
    const id = req.body.id;

    try {
        const data = await _productRepository.delete(id)
        res.status(200).send({
            data: data,
            message: "Produto removido com sucesso!"
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao remover o produto',
            data: e
        });
    }
};