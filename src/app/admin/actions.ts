// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteDrug(formData: FormData) {
  const drugId = formData.get('drugId') as string;
  
  try {
    const response = await fetch(`http://localhost:4000/drugs/${drugId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete drug');
    }

    // Revalidate the admin page and the specific drug detail page
    revalidatePath('/admin');
    revalidatePath(`/drugs/${drugId}`);
    
  } catch (error) {
    console.error('Error deleting drug:', error);
    throw error;
  }
}

export async function createDrug(formData: FormData) {
  const id = formData.get('id') as string;
  const companyName = formData.get('companyName') as string;
  const drugName = formData.get('drugName') as string;
  const fdaNdcCode = formData.get('fdaNdcCode') as string;

  try {
    const response = await fetch('http://localhost:4000/drugs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        companyName,
        drugName,
        fdaNdcCode,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create drug');
    }

    // Revalidate the admin page and the new drug detail page
    revalidatePath('/admin');
    revalidatePath(`/drugs/${id}`);
    
  } catch (error) {
    console.error('Error creating drug:', error);
    throw error;
  }

  redirect('/admin');
}

export async function updateDrug(drugId: string, formData: FormData) {
  const companyName = formData.get('companyName') as string;
  const drugName = formData.get('drugName') as string;
  const fdaNdcCode = formData.get('fdaNdcCode') as string;

  try {
    const response = await fetch(`http://localhost:4000/drugs/${drugId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: drugId,
        companyName,
        drugName,
        fdaNdcCode,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update drug');
    }

    // Revalidate the admin page and the drug detail page
    revalidatePath('/admin');
    revalidatePath(`/drugs/${drugId}`);
    
  } catch (error) {
    console.error('Error updating drug:', error);
    throw error;
  }

  redirect('/admin');
}