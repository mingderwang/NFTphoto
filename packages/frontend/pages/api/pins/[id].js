// fetch pins data by username
export default async function handler(req, res) {
  const userId = req.query.id;
  // Get data from your database
  const punks = await fetch(
    `https://api.pinterest.com/v3/pidgets/users/${userId}/pins/`
  );
  const result = await punks.json();
  res.status(200).json(result.data?.pins);
}
