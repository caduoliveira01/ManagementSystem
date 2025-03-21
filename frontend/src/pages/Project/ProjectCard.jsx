import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotFilledIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import React from 'react'

const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3x1">
      <div className='space-y-5'>
        <div className='space-y-2'>
          <div className='justify-between flex'>
            <div className='flex items-center gap-5'>
              <h1 className='cursor-pointer font-bold text-lg'>Create ecommerce project</h1>
              <DotFilledIcon/>
              <p className='text-sm text-gray-400'>Full stack</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <DotsHorizontalIcon/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className='text-gray-400 text-sm '>hannah linda</p>
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
            {[1,1,1,1].map((item)=><Badge key={item} variant="outline">{"s2"}</Badge>)}
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard