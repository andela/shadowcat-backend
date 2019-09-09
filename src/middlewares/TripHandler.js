function tripHandlerMiddleware(req, res, next) {
    const { currentOfficeData, id: userId } = req;
    const tripData = {
        ...req.body,
        userId,
        currentOfficeLocation: Number(req.body.currentOfficeLocation),
        tripId: uuidv4(),
        departureDate: new Date(req.body.departureDate).toUTCString(),
        returnDate: new Date(req.body.returnDate).toUTCString(),
        requestStatus: 'pending',
        destination: Object.values(req.destinationData)
    };

    if (tripType === 'returnTrip') {
        tripData.accommodation = req.body.accommodation;
    }

    if (tripType === 'multicity') {
        const err = multicityCheck(tripData);
        if (err) return next(err);
    }

    req.tripData = tripData;
    next(req); // TripController.create
}

class Trip {
    static async createTrip(req, res) {
        try {
            const trip = await Request.create(req.tripData);
            if (trip) {
                res.status(201).send({
                    success: true,
                    data: trip
                });
            }
        } catch (err) {
            next(err);
        }
    }
}