import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'

const getCompany = createAsyncThunk('manager/company/get', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('manager/company')
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const addCompany = createAsyncThunk('manager/company/add', async ({ companyInfor }, thunkAPI) => {
    try {
        const response = await axiosClient.post('manager/company', {
            name: companyInfor.name,
            email: companyInfor.email,
            tel: companyInfor.tel,
            gender: true,
            idCard: companyInfor.idCard,
            address: companyInfor.address,
            beginWorkDate: new Date().toISOString().slice(0, 10),
            businessName: companyInfor.businessName,
            businessLicense: companyInfor.businessLicense,
        })
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const editCompanyInfor = createAsyncThunk(
    'manager/company/edit',
    async (companyInfor, thunkAPI) => {
        try {
            const response = await axiosClient.put('manager/company', {
                id: companyInfor.id,
                name: companyInfor.representName,
                email: companyInfor.email,
                tel: companyInfor.telephone,
                gender: true,
                idCard: companyInfor.idCard,
                address: companyInfor.address,
                beginWorkDate: companyInfor.beginWorkDate,
                businessName: companyInfor.firmName,
                businessLicense: companyInfor.businessLicense,
            })
            return response
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const editCompanyPolicy = createAsyncThunk('manager/company/edit', async (policy, thunkAPI) => {
    try {
        const response = await axiosClient.put('admin/policy', {
            policy: policy,
        })
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const assignRouteForCompany = createAsyncThunk(
    'manager/company/assign-route',
    async ({ listRoute, companyId }, thunkAPI) => {
        try {
            const response = await axiosClient.post('manager/company/assign-company', {
                routeIds: listRoute,
                companyId: companyId,
            })
            return response
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getAssignedRouteForCompany = createAsyncThunk(
    'manager/company/assign-route/get',
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get('manager/company/assign-company')
            return response
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const companyThunk = {
    getCompany,
    addCompany,
    editCompanyInfor,
    assignRouteForCompany,
    getAssignedRouteForCompany,
    editCompanyPolicy,
}

export default companyThunk
