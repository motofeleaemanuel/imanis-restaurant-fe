import Dish from "@/db/models/Dish"
import Drink from "@/db/models/Drink"
import dbConnect from "@/db/mongoose"

export const getMenuAction = async () => {
  try {
    await dbConnect()
    // grab everything, ordered by your 'order' field
    const dishes = await Dish.find().sort({ order: 1 }).exec()
    const drinks = await Drink.find().sort({ order: 1 }).exec()

    if (!Array.isArray(dishes) || !Array.isArray(drinks)) {
      throw new Error('Menu lookup returned garbage')
    }

    return {
      dishes: dishes.map(d => ({
        id:            d._id,
        name:          d.name,
        description:   d.description,
        ingredients:   d.ingredients,
        allergens:     d.allergens,
        category:      d.category,
        price:         d.price,
        imageURL:      d.imageURL,
        imagePublicId: d.imagePublicId,
        order:         d.order,
      })),
      drinks: drinks.map(d => ({
        id:            d._id,
        name:          d.name,
        description:   d.description,
        ingredients:   d.ingredients,
        category:      d.category,
        subcategory:   d.subcategory,
        price:         d.price,
        sizeOptions:   d.sizeOptions,
        imageURL:      d.imageURL,
        imagePublicId: d.imagePublicId,
        order:         d.order,
      })),
    }
  } catch (err) {
    console.error('🛑 getMenuAction error:', err)
    throw new Error('Failed to fetch menu')
  }
}