export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'api-version': '2020-01-31',
}

export const BASE_UPDATE_HEADERS = {
  'If-Match': 'address',
  'Content-Type': 'application/json-patch+json',
  'api-version': '2020-01-31',
}

export const URLS = {
  CONFIGURATION_APPOINTMENT_TYPES: '/configuration/appointmentTypes',
  PROPERTIES_TYPES: '/properties/?marketingMode=selling',
  UPDATE_PROPERTIES_TYPES: '/properties',
}
