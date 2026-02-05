'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addMember(formData : FormData) {
    const supabase = await createClient();
    const Name = formData.get('memberName') as string;
    const Department = formData.get('memberDepartment') as string;
    const Headshot = formData.get('memberHeadshot') as File;
    const Role = formData.get('memberRole') as string;
    const LinkedIn = formData.get('memberLinkedIn') as string;

    const underscoredName = `${Name}`;
    const imageName = underscoredName.replace(/\s+/g, '_');

    const { data: uploadData, error: uploadError } = await supabase.storage
    .from('MemberPhotos')
    .upload(imageName, Headshot)

    if(uploadError) throw new Error('Upload Failed');

    const { data: { publicUrl } } = supabase.storage
    .from('TeamMembers')
    .getPublicUrl(imageName)

    const { error } = await supabase
    .from('TeamMembers')
    .insert({ Name, Department, publicUrl, LinkedIn, Role})

  if (!error) revalidatePath('/team')
}

// export async function deleteMember({id: number}) {
    
// }