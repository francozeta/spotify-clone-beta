"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import FillHeartIcon from "@/icons/FillHeartIcon";
import OutlineHeart from "@/icons/OutlineHeartIcon";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FC, useEffect, useState } from "react";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: FC<LikeButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select()
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    }
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? FillHeartIcon : OutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success('Disliked');
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id,
        });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Liked');
      }
    }
    router.refresh();
  }
  return (
    <button
      onClick={handleLike}
      className="
        hover:opacity-75 
        cursor-pointer 
        transition
      "
    >
      <Icon fill={isLiked ? '#22c55e' : '#fff'} size={18} />
    </button>
  )
}

export default LikeButton;