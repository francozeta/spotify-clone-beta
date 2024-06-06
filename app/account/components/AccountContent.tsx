"use client";

import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!isLoading && !user) router.replace('/');
  }, [isLoading, user, router]);

  const redirectCustomerPortal = async () => {
    setLoading(true); 
    try {
      const {url, error} = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if(error) toast.error((error as Error).message);
      setLoading(false);
    }
  }
  return (
    <div className="mb-7 px-6">
       <p>Welcome, {user?.id || 'User'}</p>
    </div>
  )
}

export default AccountContent