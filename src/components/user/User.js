import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Checkbox from '../../elements/Checkbox';
import Datatable from '../../elements/DataTable';
import { Dialog } from 'primereact/dialog';
import { FaPlus } from 'react-icons/fa6';
import { LuPencil } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";

const User = () => {
    const [allUserData, setAllUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: 'USER', // Default role
        status: 'ACTIVE', // Default status
        accountBlocked: false,
    });
    const [dialogVisible, setDialogVisible] = useState(false);

    const getAllUserData = () => {
        UserService.getallUsers().then(data => {
            setAllUserData(data);
        });
    };

    useEffect(() => {
        getAllUserData();
    }, []);

    // Handle form field changes using spread operator
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setFormData({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            accountBlocked: user.accountBlocked,
        });
        setDialogVisible(true);
    };

    // CREATE - Handle create new user
    const handleCreate = async (e) => {
        e.preventDefault();

        console.log('pppppp', formData);

        const newUser = { ...formData };

        try {
            const createdUser = await UserService.createUser(newUser);
            setAllUserData([...allUserData, createdUser]);
            resetForm();
            setDialogVisible(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // UPDATE - Handle update user
    const handleUpdate = async (e) => {
        e.preventDefault(); 

        if (!selectedUser) return;

        const updatedUser = { ...formData };

        try {
            const updated = await UserService.updateUser(selectedUser.id, updatedUser);
            setAllUserData(allUserData.map(user => (user.id === updated.id ? updated : user)));
            resetForm();
            setDialogVisible(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // DELETE - Handle delete user
    const handleDelete = async (id) => {
        try {
            await UserService.deleteUser(id);
            setAllUserData(allUserData.filter(user => user.id !== id)); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setSelectedUser(null);
        setFormData({
            email: '',
            password: 'User@123', // Default password
            firstName: '',
            lastName: '',
            role: 'USER', // Default role
            status: 'ACTIVE', // Default status
            accountBlocked: false,
        });
    };

    // Open dialog for create or update user
    const openDialog = () => {
        resetForm();
        setDialogVisible(true);
    };

    const userColumns = [
        { field: 'firstName', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'status', header: 'Status' },
        { field: 'role', header: 'Role' },
        {
            header: 'Action',
            body: (rowData) => (
                <div>
                    <LuPencil onClick={() => handleSelectUser(rowData)} />
                    <IoCloseSharp onClick={() => handleDelete(rowData.id)} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} />
                </div>
            ),
        },
    ];

    return (
        <div className='main-content'>
            <FaPlus onClick={openDialog} />

            <div className='spacing width-100'>
                <Datatable
                    value={allUserData}
                    columns={userColumns}
                />
            </div>

            <Dialog header={selectedUser ? 'Update User' : 'Create User'} visible={dialogVisible} onHide={() => setDialogVisible(false)}>
                <form onSubmit={selectedUser ? handleUpdate : handleCreate}>
                    <div>
                        <Input
                            id='firstName'
                            label="First Name"
                            name='firstName'
                            className='input-text'
                            value={formData.firstName}
                            onChangeText={handleInputChange}
                        />
                        <Input
                            id='lastName'
                            label="Last Name"
                            name='lastName'
                            className='input-text'
                            value={formData.lastName}
                            onChangeText={handleInputChange}
                        />
                        <Input
                            id='email'
                            label="Email"
                            name='email'
                            className='input-text'
                            value={formData.email}
                            onChangeText={handleInputChange}
                        />
                        <Input
                            id='status'
                            name='status'
                            label="Status"
                            className='input-text'
                            value={formData.status}
                            onChangeCheck={handleInputChange}
                        />
                        <Input
                            id='role'
                            label="Role"
                            name='role'
                            className='input-text'
                            value={formData.role}
                            onChangeText={handleInputChange}
                        />
                        <Checkbox
                            id='accountBlocked'
                            name='accountBlocked'
                            label="Account Blocked"
                            className='input-check'
                            value={formData.accountBlocked}
                            onChangeCheck={handleInputChange}
                        />
                    </div>
                    <div className="dialog-footer">
                        <button
                            className="submit-btn"
                            icon="pi pi-times"
                            type="submit"
                            // onChangeButton={() => setDialogVisible(false)}
                        >Cancel </button>

                        <button
                            className="submit-btn"
                            icon="pi pi-check"
                            type="submit" // Use submit type for the form
                        >{selectedUser ? 'Update' : 'Create'} </button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default User;
