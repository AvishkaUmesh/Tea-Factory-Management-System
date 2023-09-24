const FirewoodStock = require('../models/firewoodstock.models')

const addFirewoodStock = async (req, res, next) => {
  const { supID, itemType, quantity, price } = req.body
  let firewoodstock

  try {
    firewoodstock = new FirewoodStock({
      supID,
      itemType,
      quantity,
      price

    })
    await firewoodstock.save()
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ firewoodstock })
}

const getfirewoodStock = async (request, response) => {
  try {
    const firewoodstock = await FirewoodStock.find({})
    response.status(200).json(firewoodstock)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

const getfirewoodStockId = async (req, res, next) => {
  const id = req.params.id
  let firewoodstock

  try {
    firwoodstock = await FirewoodStock.findById(id)
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ firewoodstock })
}

const editfirewoodstock = async (req, res, next) => {
  const id = req.params.id
  const {
    quantity
  } = req.body

  let firewoodstock

  try {
    firewoodstock = await FirewoodStock.findByIdAndUpdate(id, {
      quantity
    })
    firewoodstock = await firewoodstock.save()
  } catch (err) {
    console.log(err)
  }

  if (!firewoodstock) {
    return res
      .status(400)
      .json({ message: 'Unable to Update stock Details.' })
  }

  return res.status(200).json({ firewoodstock })
}

const deletefirewoodstock = async (request, response) => {
  try {
    await FirewoodStock.deleteOne({ _id: request.params.id })
    response.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}

exports.deletefirewoodstock = deletefirewoodstock
exports.getfirewoodStockId = getfirewoodStockId
exports.editfirewoodstock = editfirewoodstock
exports.getfirewoodStock = getfirewoodStock
exports.addfirewoodStock = addFirewoodStock
