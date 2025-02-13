import React, { useState } from "react";
import {Autocomplete, AutocompleteItem, Input, InputProps} from "@nextui-org/react";
import {useFilter} from "@react-aria/i18n";
import { useQuery } from "react-query";
import axios from "axios";
import { address } from "framer-motion/client";
import { Control, RegisterOptions, useController } from "react-hook-form";


  interface Address {
    formattedAddress: string;
    latitude: number;
    longitude: number;
    postalCode?: string;
    city?: string;
    country: string;
  }

  interface GooglePlacesInputProps  extends InputProps{
    name: string;
    control: Control<any>;
    rules?: Omit<RegisterOptions<any, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;
    placeholder?: string;
    addressKey?: string;
    radius?: "none" | "full" | "sm" | "md" | "lg";
    extraClass?:string
  }

export default function NewGoogleMaps(
    {
        control,
        name,
        rules,
        placeholder,
        addressKey,
        radius,
        extraClass,classNames
    }:GooglePlacesInputProps
) {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker

  const [address,setAddress]=useState<any>(null)
  
  const { field,fieldState:{error} } = useController({ name, control, rules });

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
//   typeof(field.value)=='object'?field.value.postalCode:field.value
  const {startsWith} = useFilter({sensitivity: "base"});
  const getPostalQuery=useQuery(['googleData',typeof(field.value)=='object'?field.value.postalCode:field.value],({queryKey})=>axios.get(`/api/google?address=${queryKey[1]}}`),{
    enabled:field.value==null?false:true,
    onSuccess(data) {
        console.log('sucess',data.data.results)
        if(data.data.results.length>0){
            console.log('chekkkk',typeof(field.value)=='object'?field.value.postalCode:field.value)
            const place=data.data.results.find((e:any)=>{
                const found=e.address_components.find((j:any)=>j.long_name.toLowerCase()==(typeof(field.value)=='object'?field.value.postalCode:field.value).toLowerCase())
                if(found){
                    return found
                }
            })

            // ''.toLowerCase
            console.log('placeee',place)
            if(place){
                const addressDetails: Address = {
                    latitude: place.geometry.location?.lat ?? 0,
                    longitude: place.geometry.location?.lng ?? 0,
                    postalCode: getAddressComponent(place, "postal_code"),
                    city: getAddressComponent(place, "locality")?getAddressComponent(place, "locality"):"none",
                    country: getAddressComponent(place, "country"),
                    formattedAddress: place.formatted_address || "",
                  };
                //   setAddress(addressDetails)
                field.onChange(addressDetails)

                  return 
            }

            //   field.onChange(addressDetails)
        }
        // field.onChange('')
        // setAddress(null)
    },
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
    console.log('place',place)
    if(place){

        const addressDetails: Address = {
            latitude: place.geometry.location?.lat ?? 0,
            longitude: place.geometry.location?.lng ?? 0,
            postalCode: getAddressComponent(place, "postal_code"),
            city: getAddressComponent(place, "locality")?getAddressComponent(place, "locality"):"none",
            country: getAddressComponent(place, "country"),
            formattedAddress: place.formatted_address || "",
          };
          field.onChange(addressDetails)
          return
    }

    




     
    

  };

  function blurring(e:any){
    field.onChange(e.target.value)
    console.log(e.tar)
}


  const onInputChange = (value:any) => {
    console.log('changed')
    field.onChange(value)

   
  };

  function Changing(e:any){
    console.log('valieeee',e.target.value)
    field.onChange(e.target.value)
    // if(!e.target.value){
    //     setAddress(null)
    // }
  }

  // Show entire list if user opens the menu manually
  
  console.log('value',field.value,typeof(field.value))
//   console.log('address',address)
  return (

    <Input {...field}
    classNames={classNames}
    className={`w-full font-bold text-xl lg:text-2xl text-color-6 pb-6  ${extraClass} `}
      value={typeof(field.value)=='object'?field.value.postalCode:field.value}
    isInvalid={getPostalQuery.data && !field.value?.postalCode}
    errorMessage={'Enter Valid Postal Code'}
    placeholder="Postal Code"
    variant="bordered"
    labelPlacement="outside"
    onChange={Changing}

    />
  );
}
