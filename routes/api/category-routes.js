const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Not found!' });
  }
});

// be sure to include its associated Products by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    !category ? res.status(404).json({message: "id not found"}) : res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Not found!' });
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'creation failed' });
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      res.status(404).json({ message: 'id not found' })
      return;
    }

    const [changedRows] = await Category.update(req.body, { where: { id: req.params.id } });
    !changedRows ? res.status(404).json({ message: 'No changes made' }) : res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
