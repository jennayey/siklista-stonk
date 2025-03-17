// pages/submit-city.tsx
'use client'
import React, { useState } from 'react';

interface FormDataValues {
  title: string;
}

const SubmitCity: React.FC = () => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //get the JWT token from local storage, or wherever you store it.
      const token = localStorage.getItem('jwt');

      const response = await fetch('/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}` //send the JWT token.
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Submission successful:', data);
        alert('Submission successful!');
        setFormData({ title: '' });
      } else {
        console.error('Submission failed:', response.statusText);
        alert('Submission failed. Please try again. Make sure you are logged in.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again. Make sure you are logged in.');
    }
  };

  return (
    <div>
      <h1>Submit City</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">City Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitCity;