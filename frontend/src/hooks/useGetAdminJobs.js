import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../utils/axios';
import { JOB_API } from '../utils/constants';
import { setAdminJobs } from '../redux/jobSlice';

const useGetAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${JOB_API}/getadminjobs`);
        if (data.success) dispatch(setAdminJobs(data.jobs));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
};

export default useGetAdminJobs;