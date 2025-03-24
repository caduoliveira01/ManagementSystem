import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import IssueCard from './IssueCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'

const IssueList = ({ title, status }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Card className="w-full md:w=[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className='space-y-2'>
              {[1, 1, 1].map((item) => <IssueCard key={item} />)}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full items-center flex gap-2" onClick={() => setOpen(true)}>
                <PlusIcon /> Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IssueList;
