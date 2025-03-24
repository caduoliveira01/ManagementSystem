import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';

const CreateIssueForm = ({ onClose }) => { 
  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
    }
  });

  const onSubmit = (data) => {
    console.log("create project data", data);
    onClose(); 
  };

  return (
    <div>
      <Form {...form}>
        <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control}
            name="issueName"
            rules={{ required: "Issue name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="Issue name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-5">Create Issue</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
