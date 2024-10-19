export default function CompanyCreateSanitizeData(data) {
  const allowedFields = [
    'id',
    'corporateReason',
    'cnpj',
    'status',
    'blocked',
    'cratedBy'
  ];
  const sanitizedCreateData = {};

  // Filtrar apenas os campos permitidos
  allowedFields.forEach((field) => {
    if (data.hasOwnProperty(field)) {
      sanitizedCreateData[field] = data[field];
    }
  });

  // Verificar se existem campos não permitidos
  const disallowedFields = Object.keys(data).filter(
    (field) => !allowedFields.includes(field)
  );
  if (disallowedFields.length > 0) {
    throw new Error(
      `Os seguintes campos não são permitidos: ${disallowedFields.join(', ')}`
    );
  }

  return sanitizedCreateData;
}
