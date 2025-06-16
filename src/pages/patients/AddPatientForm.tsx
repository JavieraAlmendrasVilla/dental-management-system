
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    gender: '',
    insurance_provider: '',
    insurance_number: '',
    allergies: '',
    medical_conditions: '',
    medications: '',
    notes: '',
    registered_date: new Date().toISOString().split('T')[0], // default to today
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        allergies: formData.allergies.split(',').map(a => a.trim()),
        medical_conditions: formData.medical_conditions.split(',').map(m => m.trim()),
        medications: formData.medications.split(',').map(m => m.trim()),
      };

      const response = await fetch('http://localhost:8000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(`Server error: ${response.status} ${JSON.stringify(err)}`);
      }

      navigate('/patients'); // go back to list
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Patient</h2>

      {[
        'name', 'email', 'phone', 'address', 'date_of_birth', 'gender',
        'insurance_provider', 'insurance_number', 'allergies',
        'medical_conditions', 'medications', 'notes', 'registered_date'
      ].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
          {field === 'notes' ? (
            <textarea
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <input
              type={field.includes('date') ? 'date' : 'text'}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          )}
        </div>
      ))}

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPatientForm;
