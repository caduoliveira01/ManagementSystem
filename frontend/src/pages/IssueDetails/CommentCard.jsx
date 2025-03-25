import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

const CommentCard = () => {
  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>
                    C
                </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p>Cadu</p>
                <p>Estamos acabando?</p>
            </div>
            <Button className="rounded-full" size="icon" variant="ghost">
                <TrashIcon/>
            </Button>
        </div>
    </div>
  )
}

export default CommentCard