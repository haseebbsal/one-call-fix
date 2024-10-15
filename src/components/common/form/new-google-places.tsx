import React, { useState } from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useFilter} from "@react-aria/i18n";
import { useQuery } from "react-query";
import axios from "axios";
import { address } from "framer-motion/client";
import { Control, useController } from "react-hook-form";


  interface Address {
    formattedAddress: string;
    latitude: number;
    longitude: number;
    postalCode?: string;
    city?: string;
    country: string;
  }

  interface GooglePlacesInputProps {
    name: string;
    control: Control<any>;
    rules: any;
    placeholder?: string;
    addressKey?: string;
    radius?: "none" | "full" | "sm" | "md" | "lg";
  }

export default function NewGoogleMaps(
    {
        control,
        name,
        rules,
        placeholder,
        addressKey,
        radius,
    }:GooglePlacesInputProps
) {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker
  
  const { field } = useController({ name, control, rules });

  const [postalCode,setPostalCode]=useState('')

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.

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
  
  const {startsWith} = useFilter({sensitivity: "base"});
  const getPostalQuery=useQuery(['googleData',field.value?field.value.postalCode:""],({queryKey})=>axios.get(`/api/google?address=${queryKey[1]}}`),{
    enabled:!!field.value,
  })

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box
  const onSelectionChange = (key:any) => {
    console.log('key',key)     
    const place=getPostalQuery.data?.data.results.find((e:any)=>{
        const found=e.address_components.find((j:any)=>j.long_name==key)
        if(found){
            return found
        }
    })
    // const actualFind=find
    // console.log('find',find)
    const addressDetails: Address = {
        latitude: place.geometry.location?.lat ?? 0,
        longitude: place.geometry.location?.lng ?? 0,
        postalCode: getAddressComponent(place, "postal_code"),
        city: getAddressComponent(place, "locality")?getAddressComponent(place, "locality"):"none",
        country: getAddressComponent(place, "country"),
        formattedAddress: place.formatted_address || "",
      };

      field.onChange(addressDetails)

      console.log('address',addressDetails)


     
    
  };

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const onInputChange = (value:any) => {
    console.log('changed')
    // setPostalCode(value)
    field.onChange({postalCode:value})

   
  };

  // Show entire list if user opens the menu manually
  
 
  return (
    <Autocomplete
      className="w-full font-bold text-xl lg:text-2xl text-color-6 pb-6"
    //   inputValue={fieldState.inputValue}
    allowsCustomValue
      items={getPostalQuery.data?getPostalQuery.data?.data.results.length?getPostalQuery.data?.data.results:[]:[]}
      isLoading={getPostalQuery.isFetching}
      value={field.value?field.value.formattedAddress?field.value.postalCode:field.value.postalCode:""}
      placeholder="Postal Code"
    //   selectedKey={fieldState.selectedKey}
      variant="bordered"
      labelPlacement="outside"
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
    >
      {(item:any) => <AutocompleteItem key={item.address_components.find((component:any) =>
        component.types.includes('postal_code'),
      )?.long_name || ""}>{item.address_components.find((component:any) =>
        component.types.includes('postal_code'),
      )?.long_name || ""}</AutocompleteItem>}
    </Autocomplete>
  );
}
