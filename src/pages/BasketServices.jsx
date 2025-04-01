import React from 'react'

function BasketServices() {
    return (
        <div>
            {
                services > 0 ? services.map((el) => {

                    if (el.quantity != 0) {
                        return (
                            <ServicesCard
                                key={el.id}
                                id={el.id}
                                name={el.name}
                                price={el.price}
                                desc={el.description}
                                isDescShow={true}
                                quantity={el.quantity}
                            />
                        )
                    } else {
                        return null
                    }
                }) : <h1>This page is empty</h1>
            }
        </div>
    )
}

export default BasketServices