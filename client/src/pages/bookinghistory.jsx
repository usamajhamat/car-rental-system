import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Accountbar from '../Components/Navbarcomponents/Accountbar';
import Footer from '../Components/Bodycomponents/Footer';
import LinearColor from '../Components/Bodycomponents/linearprogress';
import { UserContext } from '../Context/Clientcontext';

export default function Booking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const { user } = useContext(UserContext); // Assume `UserContext` provides user info and token

    // Fetch bookings
    useEffect(() => {
        if (!user) return; // Wait for user context to be ready

        axios
            .get('/api/bookings', {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Pass the JWT token
                },
            })
            .then((response) => {
                console.log('Bookings:', response.data);
                setBookings(response.data); // Update bookings state
                setLoading(false); // Turn off loading
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
                setLoading(false); // Turn off loading even if there’s an error
            });
    }, [user]); // Dependency array ensures it runs when `user` changes

    // Cancel booking
    const handleCancelBooking = (bookingId) => {
        axios
            .post(
                '/api/cancel',
                { bookingId },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then((response) => {
                console.log('Booking canceled:', response.data);
                // Update bookings state after cancellation
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== bookingId)
                );
            })
            .catch((error) => {
                console.error('Error canceling booking:', error);
            });
    };

    if (loading) return <LinearColor />; // Show a loading bar while fetching data

    return (
        <>
            <Accountbar />
            <div className="container mx-auto py-4 flex justify-center md:justify-start">
                <h2 className="text-xl font-semibold italic">Booking History</h2>
            </div>
            <div className="container mx-auto py-4">
                {bookings.length === 0 ? (
                    <p className="text-center italic">No bookings found.</p>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="shadow-lg p-4 rounded bg-white text-center"
                            >
                                <h3 className="font-semibold">{`${booking.firstname} ${booking.lastname}`}</h3>
                                <p>{booking.email}</p>
                                <p>{booking.phone}</p>
                                <p>{`${booking.pickPlace} - ${booking.dropPlace}`}</p>
                                <p>{`${booking.pickDate} - ${booking.dropDate}`}</p>
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                                    onClick={() => handleCancelBooking(booking._id)}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
