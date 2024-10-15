import axios from "axios";
import { address } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";

interface Address {
    formattedAddress: string;
    latitude: number;
    longitude: number;
    postalCode?: string;
    city?: string;
    country: string;
  }

const getAddressComponent = (
    place: google.maps.places.PlaceResult,
    type: string,
  ): string => {
    return (
      place.address_components?.find((component) =>
        component.types.includes(type),
      )?.long_name || ""
    );
  };




export async function GET(request:NextRequest){
    const address=request.nextUrl.searchParams.get('address')
    const getData=await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&components=postal_code:${address}|country:UK`)
    
    return NextResponse.json(getData.data)
}