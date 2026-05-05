const Product = require('../models/Product');
const SubCategory = require('../models/SubCategory');

exports.getAllProductsService = async (filters) => {
    const { 
        category, subCategory, subSlug, minPrice, maxPrice, 
        stock, sort, bestSeller, limit, keyword, page = 1 
    } = filters;

    let query = {};

    // 🔍 1. Search Logic (Title match)
    if (keyword) {
        query.title = { $regex: keyword, $options: "i" };
    }

    // 🎯 2. ID Based & Boolean Filters
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (stock) query.stock = stock;
    if (bestSeller) query.bestSeller = true;

    // 🎯 3. Slug based filter (Subcategory query)
    if (subSlug) {
        const sub = await SubCategory.findOne({ slug: subSlug });
        if (sub) query.subCategory = sub._id;
    }

    // 💰 4. Price range logic
    if (minPrice || maxPrice) {
        query.price = { 
            $gte: Number(minPrice) || 0, 
            $lte: Number(maxPrice) || 999999 
        };
    }

    // 🔢 5. Pagination Logic (New)
    const resPerPage = Number(limit) || 12; // Default 12 ta product
    const skip = (Number(page) - 1) * resPerPage;

    // 🚀 6. Execution
    let sortBy = { createdAt: -1 };
    if (sort === 'priceLow') sortBy = { price: 1 };
    if (sort === 'priceHigh') sortBy = { price: -1 };

    // Total count ber kora (Frontend-e pagination button-er jonno lagbe)
    const totalCount = await Product.countDocuments(query);

    const products = await Product.find(query)
        .populate('category subCategory')
        .sort(sortBy)
        .limit(resPerPage)
        .skip(skip);

    return { products, totalCount, page, totalPages: Math.ceil(totalCount / resPerPage) };
};


