import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../utils/axios';
import { JOB_API } from '../utils/constants';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${JOB_API}/get`);
        if (data.success) dispatch(setAllJobs(data.jobs));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
};

export default useGetAllJobs;