import React, { useEffect, useState } from 'react'
import GrowerDashboard from '../components/GrowerDashboard'
import CustomerDashboard from '../components/CustomerDashboard'
import { useNavigate } from 'react-router-dom';
import { authController } from '../services/auth-controller';

const Dashboard = () => {

    const navigate = useNavigate();

    const [userType , setUserType] = useState("");

    const validateUser = async () => {

        const token = localStorage.getItem('token');

        if (token === null) {
            navigate('/signin');
        }

        const response = await authController();
        console.log(response);
        setUserType(response.data.payload.type);
    }


useEffect(() => {
    validateUser();
} ,[])

return (
    <div>
        {
            userType === "Grower" ? <GrowerDashboard /> : <CustomerDashboard />
        }
    </div>
)
}

export default Dashboard