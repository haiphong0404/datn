import React from 'react'

const Dashboard_account = () => {
    return (

        <div class="tab-pane fade show active" id="dashboad" role="tabpanel">
            <div class="myaccount-content">
                <h5>Dashboard</h5>
                <div class="welcome">
                    <p>Hello, <strong>Erik Jhonson</strong> (If Not <strong>Jhonson
                        !</strong><a href="login-register.html" class="logout"> Logout</a>)</p>
                </div>
                <p class="mb-0">From your account dashboard. you can easily check &
                    view your recent orders, manage your shipping and billing addresses
                    and edit your password and account details.</p>
            </div>
        </div>

    )
}

export default Dashboard_account