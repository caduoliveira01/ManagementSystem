import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateCommentForm = ({issueId}) => {
     const form = useForm({
            defaultValues: {
              content:"",
            }
          });
        
          const onSubmit = (data) => {
            console.log("create project data", data);
          };
  return (
    <div>
      <Form {...form}>
        <form className='flex gap-2' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <div>
                  <Avatar>
                    <AvatarFallback>
                      C
                    </AvatarFallback>
                  </Avatar>
                </div>
                <FormControl>
                  <Input {...field} type="text" className="w-[20rem]" placeholder="Comment" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateCommentForm