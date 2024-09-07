import React, { useEffect, useRef } from "react";
import { useController, Control } from "react-hook-form";
import { Loader } from "@googlemaps/js-api-loader";
import { config } from "@/_utils/helpers/config";
import BaseInput from "./base-input";
import { Address } from "@/_utils/types";

interface GooglePlacesInputProps {
  name: string;
  control: Control<any>;
  rules: any;
  placeholder?: string;
  addressKey?: any;
  radius?: "none" | "full" | "sm" | "md" | "lg";
  changeAddressKey:any
}

const EditGooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  addressKey,
  radius,
  changeAddressKey
  
}) => {
  const { field } = useController({ name, control, rules });
  const inputRef = useRef<HTMLInputElement>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: config.googleMapsApiKey,
      libraries: ["places"],
      version: "weekly",
    });

    loader
      .load()
      .then(() => {
        if (inputRef.current) {
          autoCompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              fields: ["address_components", "geometry", "formatted_address"],
              types: ["address"],
            },
          );
          autoCompleteRef.current.addListener("place_changed", onPlaceSelected);
        }
      })
      .catch((error) => console.error("Error loading Google Maps", error));
  }, []);

  console.log('field',field)
console.log('address key',addressKey)
  const onPlaceSelected = (): void => {
    const place = autoCompleteRef.current?.getPlace();

    console.log(place, "google place");

    if (!place?.geometry) {
      console.error("No geometry data available for the selected place.");
      return;
    }

    const addressDetails: Address = {
      latitude: place.geometry.location?.lat() ?? 0,
      longitude: place.geometry.location?.lng() ?? 0,
      postalCode: getAddressComponent(place, "postal_code"),
      city: getAddressComponent(place, "locality"),
      country: getAddressComponent(place, "country"),
      formattedAddress: place.formatted_address || "",
    };

    field.onChange(addressDetails);
  };

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

  const handleBlur = async (): Promise<void> => {
    if (!autoCompleteRef.current || !inputRef.current) {
      return;
    }

    const value = inputRef.current.value.trim();
    if (!value) {
      return;
    }

    try {
      const geocoder = new google.maps.Geocoder();
      const results = await new Promise<google.maps.GeocoderResult[]>(
        (resolve, reject) => {
          geocoder.geocode({ address: value }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results) {
              resolve(results);
            } else {
              reject(status);
            }
          });
        },
      );

      if (results.length > 0) {
        const place = results[0];
        console.log(place, "google postal code");
        const addressDetails: Address = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          postalCode: getAddressComponent(place, "postal_code"),
          city: getAddressComponent(place, "locality"),
          country: getAddressComponent(place, "country"),
          formattedAddress: place.formatted_address || "",
        };
        console.log(addressDetails, "addressDetails");
        if(field.value!=undefined){
            changeAddressKey((prev:any)=>{
                return {...prev,address:addressDetails}
     
             }
         )
        }
        
        field.onChange(addressDetails);
      }
    } catch (error) {
      console.error("Error geocoding the input", error);
    }
  };

  return (
    <BaseInput
      ref={inputRef}
      name={name}
      control={control}
      placeholder={placeholder}
      rules={rules}
      type="text"
      radius={radius ? radius : "full"}
      value={field.value==undefined?addressKey!.postalCode:field.value?.postalCode}
      onBlur={handleBlur}
    />
  );
};

export default EditGooglePlacesInput;
