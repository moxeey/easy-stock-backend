const request=require('supertest')
const app=require('./app')
const assert=require('assert')
// request = request(`http://localhost:${process.env.PORT}`)

describe('Business APIs',() => {
    it('GET /business --> Get all businesses',() => {
        return request(app)
            .get('/business')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            phone: expect.any(String),
                            shops: expect.any(Array),
                        })
                    ])
                )
            })
    });
    it('GET /business/id --> get a specific business by ID',() => {
        return request(app)
            .get('/business/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        shops: expect.any(Array),
                    })
                )
            })

    });

    it('GET /business/id --> 404 | Business not found',() => {
        return request(app)
            .get('/business/546')
            .expect(404)
    });

    it('POST /business --> Create a new business',() => {
        return request(app)
            .post('/business')
            .send({name: "Garin Malami",phone: "08099098767"})
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        shops: expect.any(Array),
                    })
                )
            })
    });

    it('POST /business --> Validates request body ',() => {
        return request(app)
            .post('/business')
            .send({name: 243,phone: "08099098767"})
            .expect(422)
    });
    it('PATCH /business/id -->  Update business contact (phone, email, website)',() => {
        return request(app)
            .patch('/business/1')
            .send({phone: "08099000767",email: "bus@gmail.com",website: "https://mybusiness.com"})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.phone).toEqual('08099000767')
                expect(res.body.email).toEqual('bus@gmail.com')
                expect(res.body.website).toEqual('https://mybusiness.com')

            })
    });

    it('DELETE /business/id --> Delete business by ID',() => {
        return request(app)
            .delete('/business/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });

    it('GET /business/id/shops --> Get all shops of a business',() => {
        return request(app).get('/business/1/shops')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/business/1/products')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/business/1/customers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/business/1/suppliers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('GET /suppliers',() => {
        return request(app).get('/suppliers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        expect.arrayContaining(
                            expect.objectContaining({
                                name: expect.any(String),
                                phone: expect.any(String),
                                supplies: expect.any(Array),
                                transactions: expect.any(Array)
                            })
                        )
                    )
                )
            })
    });
    it('POST /suppliers',() => {
        return request(app).get('/suppliers')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        supplies: expect.any(Array),
                        transactions: expect.any(Array)
                    })

                )
            })
    });
    it('GET /suppliers/id',() => {
        return request(app).get('/suppliers/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/suppliers/1').send({phone: "08033720982"})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/suppliers/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });

});
describe('Supplies APIs',() => {
    it('GET /supplies',() => {
        return request(app).get('/supplies')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /supplies',() => {
        return request(app).get('/supplies')
            .send({})
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        shop: expect.any(Object),
                        products: expect.any(Array),
                        supplier: expect.any(Object),
                        total: expect.any(Number)
                    })
                )
            })
    });
    it('GET /supplies/id',() => {
        return request(app).get('/supplies/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/supplies/1')
            .send({products: []})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/supplies/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });

});
describe('Shops APIs',() => {
    it('GET /shops',() => {
        return request(app).get('/shops')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /shops',() => {
        return request(app).get('/shops')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('GET /shops/id',() => {
        return request(app).get('/shops/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/shops/1').send({products: []})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('DELETE /shops/id',() => {
        return request(app).get('/shops/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});
describe('Categories APIs',() => {
    it('GET /categories',() => {
        return request(app).get('/categories')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /categories',() => {
        return request(app).get('/categories')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        products: expect.any(Array)
                    })

                )
            })
    });
    it('GET /categories/id',() => {
        return request(app).get('/categories/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        products: expect.any(Array)
                    })

                )
            })
    });
    it('PATCH /categories/id',() => {
        return request(app).get('/categories/1').send({name: 'New Name'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: 'New Name',
                        products: expect.any(Array)
                    })
                )
            })
    });
    it('DELETE /categories/id',() => {
        return request(app).get('/categories/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});
describe('Products APIs',() => {
    it('GET /products',() => {
        return request(app).get('/products')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /products',() => {
        return request(app).get('/products')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('GET /products/id',() => {
        return request(app).get('/products/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/products/1').send({name: 'New Name'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: 'New Name',
                        qty: expect.any(Number),
                        price: expect.any(Number),
                        category: expect.any(Object),
                        shop: expect.any(Object),
                    })
                )
            })
    });
    it('DELETE /products/id',() => {
        return request(app).get('/products/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});
describe('Customers APIs',() => {
    it('GET /customers',() => {
        return request(app).get('/customers')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /customers',() => {
        return request(app).get('/customers')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        phone: expect.any(String),
                        orders: expect.any(Array),
                        transactions: expect.any(Array)
                    })
                )
            })
    });
    it('GET /customers/id',() => {
        return request(app).get('/customers/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/customers/1').send({name: 'New Name',phone: '09022314524'})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/customers/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});
describe('Orders APIs',() => {
    it('GET /orders',() => {
        return request(app).get('/orders')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /orders',() => {
        return request(app).get('/orders')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('GET /orders/id',() => {
        return request(app).get('/orders/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/orders/1').send({})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('DELETE /orders/id',() => {
        return request(app).get('/orders/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});
describe('Transactions APIs',() => {
    it('GET /transactions',() => {
        return request(app).get('/transactions')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('POST /transactions',() => {
        return request(app).get('/transactions')
            .expect(201)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
    it('GET /transactions/id',() => {
        return request(app).get('/transactions/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/transactions/1').send({})
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body).toEqual(
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
        return request(app).get('/transactions/1')
            .expect(200)
            .expect('Content-Type',/json/)
            .then(res => {
                expect(res.body.success).toEqual(true)
            })
    });
});