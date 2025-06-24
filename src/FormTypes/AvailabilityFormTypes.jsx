const AvailabilityFormTypes =(idlocal) => ({
  worker_id: idlocal,
  name: '',
  services: [{ name: '', rate_type: 'hourly', rate: '', currency: 'LKR' }],
  availability_type: 'weekly',
  weekly_availability: {
    monday: { from: '', to: '' },
    tuesday: { from: '', to: '' },
    wednesday: { from: '', to: '' },
    thursday: { from: '', to: '' },
    friday: { from: '', to: '' },
    saturday: { from: '', to: '' },
    sunday: { from: '', to: '' }
  },
  locations: [''],
  coordinates: { lat: '', lng: '' },
  preferences: '',
  expected_rate: {
    rate_type: 'hourly',
    max_rate: '',
    currency: 'LKR'
  }
});
export default AvailabilityFormTypes