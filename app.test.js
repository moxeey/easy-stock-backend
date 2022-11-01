const request=require('supertest')
const app=require('./app')
const assert=require('assert')
// request = request(`http://localhost:${process.env.PORT}`)

describe('Business APIs',() => {
    it('GET /business --> Get all businesses',() => {
        return request(app)
            .get('/api/v1/business')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            phone: expect.any(String),
                            // shops: expect.any(Array),
                        })
                    ])
                )
            })
    });

    it('GET /business/id --> get a specific business by ID',() => {
        return request(app)
            .get('/api/v1/business/62f520005547c81135d54002')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        // shops: expect.any(Array),
                    })
                )
            })

    });

    it('GET /business/id --> 404 | Business not found',() => {
        return request(app)
            .get('/api/v1/business/62f520005547c81135d54019')
            .expect(404)
    });

    it('POST /business --> Validates request body ',() => {
        return request(app)
            .post('/api/v1/business')
            .send({name: 243,phone: "08099098767"})
            .expect(400)
    });
    it('PATCH /business/id -->  Update business contact (phone, email, website)',() => {
        return request(app)
            .patch('/api/v1/business/62f520005547c81135d54002')
            .send({phone: "08099000767",email: "bus@gmail.com",website: "https://mybusiness.com"})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data.phone).toEqual('08099000767')
                expect(res.body.data.email).toEqual('bus@gmail.com')
                expect(res.body.data.website).toEqual('https://mybusiness.com')

            })
    });

    it('DELETE /business/id --> Delete business by ID',() => {
        return request(app)
            .delete('/api/v1/business/62f520005547c81135d54003')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });

    it('POST /business --> Create a new business',() => {
        return request(app)
            .post('/api/v1/business')
            .send({
                "_id": "62f520005547c81135d54003",
                "name": "Business 3",
                "phone": "08021009233",
                "email": "business3@gmail.com",
                "website": "https://hello.com"
            })
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        shops: expect.any(Array),
                    })
                )
            })
    });

    it('GET /business/id/shops --> Get all shops of a business',() => {
        return request(app).get('/api/v1/business/62f520005547c81135d54002/shops')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                address: expect.any(String),
                                phone: expect.any(String),
                                business: expect.objectContaining({
                                    _id: expect.toEqual('1')
                                })
                            }
                            )
                        )
                    )
                )
            })
    });

    it('GET /business/id/products --> Get all products of a business',() => {
        return request(app).get('/api/v1/business/62f520005547c81135d54002/products')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                business: expect.objectContaining({
                                    _id: expect.toEqual('1')
                                })
                            }
                            )
                        )
                    )
                )
            })
    });
    it('GET /business/id/customers --> Get all customers of a business',() => {
        return request(app).get('/api/v1/business/62f520005547c81135d54002/customers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                business: expect.objectContaining({
                                    _id: expect.toEqual('1')
                                }),
                                orders: expect.any(Array),
                                transactions: expect.any(Array)
                            }
                            )
                        )
                    )
                )
            })
    });

    it('GET /business/id/suppliers --> Get all suppliers of a business',() => {
        return request(app).get('/api/v1/business/62f520005547c81135d54002/suppliers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                business: expect.objectContaining({
                                    _id: expect.toEqual('1')
                                }),
                                supplies: expect.any(Array),
                                transactions: expect.any(Array)
                            })
                        )
                    )
                )
            })
    });


});
describe('suppliers APIs',() => {
    return

    it('GET /suppliers',() => {
        return request(app).get('/api/v1/suppliers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                phone: expect.any(String),
                                shop: expect.any(Object),
                                supplies: expect.any(Array),
                                transactions: expect.any(Array)
                            })
                        )
                    )
                )
            })
    });

    it('GET /suppliers/id',() => {
        return request(app).get('/api/v1/suppliers/62f520005547c81135d54702')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        supplies: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
    it('PATCH /suppliers/id',() => {
        return request(app).patch('/api/v1/suppliers/62f520005547c81135d54702').send({phone: "08033720982"})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        _id: 1,
                        name: expect.any(String),
                        phone: "08033720982",
                        supplies: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
    it('DELETE /suppliers/id',() => {
        return request(app).delete('/api/v1/suppliers/62f520005547c81135d54702')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });

    it('POST /suppliers',() => {
        return request(app).post('/api/v1/suppliers')
            .send(
                {
                    "_id": "62f520005547c81135d54702",
                    "name": "Muhd Musa",
                    "phone": "08021009232",
                    "email": "muhd@gmail.com",
                    "shop": "62f520005547c81135d54002"
                }
            )
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        supplies: expect.any(Array),
                        transactions: expect.any(Array)
                    })

                )
            })
    });

});
describe('Supplies APIs',() => {
    return

    it('GET /supplies',() => {
        return request(app).get('/api/v1/supplies')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                shop: expect.any(Object),
                                products: expect.any(Array),
                                supplier: expect.any(Object),
                                total: expect.any(Number)
                            })
                        )
                    )
                )
            })
    });

    it('GET /supplies/id',() => {
        return request(app).get('/api/v1/supplies/62f520005547c81135d54801')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        shop: expect.any(Object),
                        products: expect.any(Array),
                        supplier: expect.any(Object),
                        total: expect.any(Number)
                    })

                )
            })
    });
    it('PATCH /supplies/id',() => {
        return request(app).patch('/api/v1/supplies/62f520005547c81135d54801')
            .send({products: []})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        shop: expect.any(Object),
                        products: expect.any(Array),
                        supplier: expect.any(Object),
                        total: expect.any(Number)
                    })
                )
            })
    });
    it('DELETE /supplies/id',() => {
        return request(app).delete('/api/v1/supplies/62f520005547c81135d54801')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data.success).toEqual(true)
            })
    });

    it('POST /supplies',() => {
        return request(app).post('/api/v1/supplies')
            .send({
                "_id": "62f520005547c81135d54801",
                "total": 6000000,
                "paid": 6000000,
                "supplier": "62f520005547c81135d54701",
                "shop": "62f520005547c81135d54201",
                "products": [
                    {
                        "name": "Coca-Cola",
                        "qty": 40,
                        "price": 100000
                    },
                    {
                        "name": "Maltina",
                        "qty": 20,
                        "price": 100000
                    }
                ]
            })
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        shop: expect.any(Object),
                        products: expect.any(Array),
                        supplier: expect.any(Object),
                        total: expect.any(Number)
                    })
                )
            })
    });
});
describe('Shops APIs',() => {
    return

    it('GET /shops',() => {
        return request(app).get('/api/v1/shops')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                business: expect.any(Object),
                                products: expect.any(Array),
                                title: expect.any(String),
                                phone: expect.any(String),
                                email: expect.any(String),
                                address: expect.any(String),
                                location: expect.any(Object),
                                orders: expect.any(Array),
                                supplies: expect.any(Array),
                                suppliers: expect.any(Array),
                                customers: expect.any(Array),
                                users: expect.any.any(Array)
                            })
                        )
                    )
                )
            })
    });
    it('GET /shops/id',() => {
        return request(app).get('/api/v1/shops/62f520005547c81135d54201')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        business: expect.any(Object),
                        products: expect.any(Array),
                        title: expect.any(String),
                        phone: expect.any(String),
                        email: expect.any(String),
                        address: expect.any(String),
                        location: expect.any(Object),
                        orders: expect.any(Array),
                        supplies: expect.any(Array),
                        suppliers: expect.any(Array),
                        customers: expect.any(Array),
                        users: expect.any.any(Array)
                    })
                )
            })
    });
    it('PATCH /shops/id',() => {
        return request(app).patch('/api/v1/shops/62f520005547c81135d54201').send({phone: "09022010202"})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        business: expect.any(Object),
                        products: expect.any(Array),
                        title: expect.any(String),
                        phone: expect.toEqual("09022010202"),
                        email: expect.any(String),
                        address: expect.any(String),
                        location: expect.any(Object),
                        orders: expect.any(Array),
                        supplies: expect.any(Array),
                        suppliers: expect.any(Array),
                        customers: expect.any(Array),
                        users: expect.any.any(Array)
                    })
                )
            })
    });
    it('DELETE /shops/id',() => {
        return request(app).delete('/api/v1/shops/62f520005547c81135d54201')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /shops',() => {
        return request(app).post('/api/v1/shops')
            .send(
                {
                    "_id": "62f520005547c81135d54201",
                    "business": "62f520005547c81135d54001",
                    "title": "Main Market Branch",
                    "phone": "08020101928",
                    "address": "No.32 Main Market"
                }
            )
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        business: expect.any(Object),
                        products: expect.any(Array),
                        title: expect.any(String),
                        phone: expect.any(String),
                        email: expect.any(String),
                        address: expect.any(String),
                        location: expect.any(Object),
                        orders: expect.any(Array),
                        supplies: expect.any(Array),
                        suppliers: expect.any(Array),
                        customers: expect.any(Array),
                        users: expect.any.any(Array)
                    })
                )
            })
    });
});
describe('Categories APIs',() => {
    return

    it('GET /categories',() => {
        return request(app).get('/api/v1/categories')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                products: expect.any(Array)
                            })
                        )
                    )
                )
            })
    });
    it('GET /categories/id',() => {
        return request(app).get('/api/v1/categories/62f520005547c81135d54101')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        products: expect.any(Array)
                    })

                )
            })
    });
    it('PATCH /categories/id',() => {
        return request(app).patch('/api/v1/categories/62f520005547c81135d54101').send({name: 'New Name'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.toEqual('New Name'),
                        products: expect.any(Array)
                    })
                )
            })
    });
    it('DELETE /categories/id',() => {
        return request(app).delete('/api/v1/categories/62f520005547c81135d54101')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /categories',() => {
        return request(app).post('/api/v1/categories')
            .send({
                "_id": "62f520005547c81135d54101",
                "name": "Groceries"
            })
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        products: expect.any(Array)
                    })

                )
            })
    });
});
describe('Products APIs',() => {
    return

    it('GET /products',() => {
        return request(app).get('/api/v1/products')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                qty: expect.any(Number),
                                price: expect.any(Number),
                                category: expect.any(Object),
                                shop: expect.any(Object),
                            })
                        )
                    )
                )
            })
    });
    it('GET /products/id',() => {
        return request(app).get('/api/v1/products/62f520005547c81135d54501')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        qty: expect.any(Number),
                        price: expect.any(Number),
                        category: expect.any(Object),
                        shop: expect.any(Object),
                    })
                )
            })
    });
    it('PATCH /products/id',() => {
        return request(app).patch('/api/v1/products/62f520005547c81135d54501').send({name: 'New Name'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.toEqual('New Name'),
                        qty: expect.any(Number),
                        price: expect.any(Number),
                        category: expect.any(Object),
                        shop: expect.any(Object),
                    })
                )
            })
    });
    it('DELETE /products/id',() => {
        return request(app).delete('/api/v1/products/62f520005547c81135d54501')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /products',() => {
        return request(app).post('/api/v1/products')
            .send(
                {
                    "_id": "62f520005547c81135d54501",
                    "name": "Cola Cola",
                    "qty": 300,
                    "price": 210000,
                    "category": "62f520005547c81135d54101",
                    "shop": "62f520005547c81135d54203"
                }
            )
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        qty: expect.any(Number),
                        price: expect.any(Number),
                        category: expect.any(Object),
                        shop: expect.any(Object),
                    })
                )
            })
    });
});
describe('Customers APIs',() => {
    return

    it('GET /customers',() => {
        return request(app).get('/api/v1/customers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                phone: expect.any(String),
                                orders: expect.any(Array),
                                transactions: expect.any(Array)
                            })
                        )
                    )
                )
            })
    });
    it('GET /customers/id',() => {
        return request(app).get('/api/v1/customers/62f520005547c81135d54c01')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        orders: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
    it('PATCH /customers/id',() => {
        return request(app).delete('/api/v1/customers/62f520005547c81135d54c01').send({name: 'New Name',phone: '09022314524'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: 'New Name',
                        phone: '09022314524',
                        orders: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
    it('DELETE /customers/id',() => {
        return request(app).delete('/api/v1/customers/62f520005547c81135d54c01')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /customers',() => {
        return request(app).post('/api/v1/customers')
            .send(
                {
                    "_id": "62f520005547c81135d54c01",
                    "name": "Saidu Ibrahim",
                    "phone": "08021009231",
                    "email": "saidu@gmail.com",
                    "shop": "62f520005547c81135d54001"
                }
            )
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        orders: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
});
describe('Orders APIs',() => {
    return

    it('GET /orders',() => {
        return request(app).get('/api/v1/orders')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                customer: expect.any(Object),
                                shop: expect.any(Object),
                                user: expect.any(Object),
                                products: expect.arrayContaining(
                                    expect.objectContaining({
                                        qty: expect.any(Number),
                                        price: expect.any(Number)
                                    })
                                ),
                                total: expect.any(Number)
                            })
                        )
                    )
                )
            })
    });
    it('GET /orders/id',() => {
        return request(app).get('/api/v1/orders/62f520005547c81135d54601')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        user: expect.any(Object),
                        products: expect.arrayContaining(
                            expect.objectContaining({
                                qty: expect.any(Number),
                                price: expect.any(Number)
                            })
                        ),
                        total: expect.any(Number)
                    })
                )
            })
    });
    it('PATCH /orders/id',() => {
        return request(app).patch('/api/v1/orders/62f520005547c81135d54601')
            .send({
                products: [],
                paid: 1000
            })
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        user: expect.any(Object),
                        products: expect.arrayContaining(
                            expect.objectContaining({
                                qty: expect.any(Number),
                                price: expect.any(Number)
                            })
                        ),
                        total: expect.any(Number),
                        paid: expect.toEqual(1000)
                    })
                )
            })
    });
    it('DELETE /orders/id',() => {
        return request(app).delete('/api/v1/orders/62f520005547c81135d54601')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /orders',() => {
        return request(app).post('/api/v1/orders')
            .send(
                {
                    "_id": "62f520005547c81135d54601",
                    "total": 6000000,
                    "paid": 6000000,
                    "customer": "62f520005547c81135d54c01",
                    "shop": "62f520005547c81135d54201",
                    "products": [
                        {
                            "name": "Coca-Cola",
                            "qty": 40,
                            "price": 100000
                        },
                        {
                            "name": "Maltina",
                            "qty": 20,
                            "price": 100000
                        }
                    ]
                }
            )
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        user: expect.any(Object),
                        products: expect.arrayContaining(
                            expect.objectContaining({
                                qty: expect.any(Number),
                                price: expect.any(Number)
                            })
                        ),
                        total: expect.any(Number)
                    })
                )
            })
    });
});
describe('Transactions APIs',() => {
    return

    it('GET /transactions',() => {
        return request(app).get('/api/v1/transactions')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                customer: expect.any(Object),
                                shop: expect.any(Object),
                                amount: expect.any(Number),
                                user: expect.any(Object),
                                for: expect.any(String),
                                ref: expect.any(Object),
                                remark: expect.any(String)
                            })
                        )
                    )
                )
            })
    });
    it('GET /transactions/id',() => {
        return request(app).get('/api/v1/transactions/62f520005547c81135d54901')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        amount: expect.any(Number),
                        user: expect.any(Object),
                        for: expect.any(String),
                        ref: expect.any(Object),
                        remark: expect.any(String)
                    })
                )
            })
    });
    it('PATCH /transactions/id',() => {
        return request(app).patch('/api/v1/transactions/62f520005547c81135d54901')
            .send({
                amount: 1000
            })
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        amount: expect.any(Number),
                        user: expect.any(Object),
                        for: expect.any(String),
                        ref: expect.any(Object),
                        remark: expect.any(String)
                    })
                )
            })
    });
    it('DELETE /transactions/id',() => {
        return request(app).delete('/api/v1/transactions/62f520005547c81135d54901')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
    it('POST /transactions',() => {
        return request(app).post('/api/v1/transactions')
            .send({
                "_id": "62f520005547c81135d54901",
                "amount": 1000,
                "shop": "62f520005547c81135d54201",
                "for": "Order",
                "ref": "62f520005547c81135d54601"
            })
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        customer: expect.any(Object),
                        shop: expect.any(Object),
                        amount: expect.any(Number),
                        user: expect.any(Object),
                        for: expect.any(String),
                        ref: expect.any(Object),
                        remark: expect.any(String)
                    })
                )
            })
    });
});