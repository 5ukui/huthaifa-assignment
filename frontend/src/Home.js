import React, { useContext, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { AuthContext } from './context/AuthContext';

const Home = () => {
    const { user, tasks, getTasks } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
          getTasks();
        }
    }, [user]);
    
    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <div className="h-screen flex bg-white pt-20">
            {user ? (
                <h1>Logged in</h1>
            ) : (
                <div className='flex p-[90px] font-poppins'>
                    <div className='w-[60%]'>
                        <h1 className='uppercase text-[50px]'>The Ultimate Task Management WebApp.</h1>
                        <h1>Welcome to Tasker, your ultimate solution for efficient task management and team collaboration. Designed for individuals and teams of all sizes, Tasker offers a comprehensive suite of features to help you organize, prioritize, and accomplish your tasks with ease.</h1>
                    </div>           
                </div>
            )}
        </div>
    );
};

export default Home;
