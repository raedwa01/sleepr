describe("Reservations", () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'REdwards@techstyle.com',
      password: "Password123!",
    }
    await fetch("http://auth:3001", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const response = await fetch('http://auth:3001/auth/login', { 
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    jwt = await response.text();
  });

  test('Create & Get', async () => {
 
    const createdReservation = await createReservation();
    
    const responseGet = await fetch(`http://reservations:3000/reservations/${createdReservation.id}`,{
      method: 'GET',
      headers: {
        Authentication: jwt,
      },
    });

    const reservation = await responseGet.json();
    delete reservation.timestamp;

    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        "startDate": "12-22-2022",
        "endDate": "12-29-2022",
        "invoiceId": "342323",
        "placeId": "8728",
        "charge" : {
            "amount": 35,
            "card" : {
                "cvc": "413",
                "exp_month": 12,
                "exp_year": 2027,
                "number": "4242 4242 4242 4242"
            }
        }        
      }),
    })
    expect(responseCreate.ok).toBeTruthy();
    const createdReservation = await responseCreate.json();
    delete createdReservation.timestamp;
    return createdReservation;
  };
});