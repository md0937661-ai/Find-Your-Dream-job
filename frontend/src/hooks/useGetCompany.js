import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../utils/axios';
import { COMPANY_API } from '../utils/constants';
import { setCompanies } from '../redux/companySlice';

const useGetCompany = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${COMPANY_API}/get`);
        if (data.success) dispatch(setCompanies(data.companies));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
};

export default useGetCompany;