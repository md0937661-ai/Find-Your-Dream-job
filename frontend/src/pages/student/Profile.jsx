import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { USER_API } from '../../utils/constants';
import { setUser } from '../../redux/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('fullname', form.fullname);
      formData.append('email', form.email);
      formData.append('phoneNumber', form.phoneNumber);
      formData.append('bio', form.bio);
      formData.append('skills', form.skills);

      if (profilePhoto) formData.append('profilePhoto', profilePhoto);
      if (resume) formData.append('resume', resume);

      const { data } = await API.put(`${USER_API}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        dispatch(setUser(data.user));
        setMsg({ text: 'Profile updated successfully!', type: 'success' });
      }
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Update failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 relative z-10 w-full">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">My Profile</h1>
          <p className="text-zinc-400 font-medium">Update your personal information and resume</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Profile Photo */}
          <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500" />
            <h2 className="text-xl font-black text-white mb-6">Profile Photo</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative group">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-500/20 shadow-xl" />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-500/20 to-indigo-500/20 flex items-center justify-center text-primary-400 font-bold text-4xl ring-4 ring-primary-500/20 shadow-xl">
                    {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left mt-2">
                <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all inline-block shadow-sm">
                  Change Photo
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                <p className="text-zinc-500 text-xs mt-3 font-medium">JPG, JPEG, PNG — Max 5MB</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="glass-panel border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-black text-white mb-6">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">

              {[
                { label: 'Full Name', name: 'fullname', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: '+1 234 567 890' },
              ].map((field) => (
                <div key={field.name} className={field.name === 'phoneNumber' ? 'sm:col-span-1' : ''}>
                  <label className="block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-surface/50 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              ))}

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2">Professional Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell companies about your experience and career goals..."
                  className="w-full bg-surface/50 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none"
                />
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label className="block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, Project Management (comma separated)"
                  className="w-full bg-surface/50 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                />
                {/* Skills preview */}
                {form.skills && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {form.skills.split(',').filter(s => s.trim()).map((s, i) => (
                      <span key={i} className="bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-wide px-3 py-1.5 rounded-lg">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="glass-panel border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-black text-white mb-6">Resume</h2>

            {/* Existing resume */}
            {user?.profile?.resume && (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 mb-6 hover:bg-emerald-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">
                      {user.profile.resumeOriginalName || 'Your uploaded resume'}
                    </span>
                    <span className="text-emerald-500/70 text-xs font-medium">Currently active</span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {/* Upload new */}
            <label className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer bg-surface/30 border-2 border-dashed border-white/10 hover:border-primary-500/40 rounded-2xl p-8 transition-all group text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-zinc-500 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold group-hover:text-primary-400 transition-colors text-lg mb-1">
                  {resume ? resume.name : 'Upload new resume'}
                </p>
                <p className="text-zinc-500 text-sm font-medium">PDF files only. Max size 5MB.</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Message */}
          {msg.text && (
            <div className={`flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-bold border ${
              msg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {msg.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {msg.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving Changes...
              </span>
            ) : 'Save Changes'}
          </button>

        </form>
      </div>
    </div>
  );
}