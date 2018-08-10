const express = require('express'),
  router = express.Router();

const Categoria = require('../../models/Categoria');
const validarCategoriaInput = require('../../validation/categoria');

/**
 * @route GET api/categorias/todas
 * @description Get todas as categorias por ordem alfabetica
 * @acesso Publico
 */
router.get('/todas', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nome: 1 });
    if (categorias.length <= 0) {
      return res
        .status(404)
        .json({ categorias: 'Nenhuma categoria encontrada' });
    }
    res.status(200).json(categorias);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route GET api/categorias/:nome
 * @description Get categoria pelo nome
 * @acesso Publico
 */
router.get('/:nome', async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ nome: req.params.nome }).exec();
    if (!categoria) {
      return res
        .status(404)
        .json({ categoria: 'Essa categoria ainda não existe' });
    }
    res.status(200).json(categoria);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route POST api/categorias/
 * @description Post criar categoria
 * @acesso Privado
 */
// será preciso mudar essa rota e/ou auth
router.post('/', async (req, res) => {
  const { nome } = req.body;
  const { errors, isValid } = validarCategoriaInput(nome);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    try {
      const categoria = await Categoria.find({ nome });
      if (categoria.length >= 1) {
        errors.categoria = 'Categoria já existe';
        return res.status(400).json(errors);
      }
    } catch (err) {
      res.status(400).json(err);
    }
    const newCategoria = new Categoria({ nome });
    await newCategoria.save();
    res.status(201).json({ message: 'Categoria criada com sucesso' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
