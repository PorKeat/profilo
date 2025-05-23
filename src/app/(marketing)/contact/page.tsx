import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";
import { Github } from "@/components/icons/Github";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">
          Have questions, suggestions, or want to contribute?
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-muted/20 border-muted-foreground/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">GitHub Issues</h3>
                  <p className="text-sm text-muted-foreground">For bugs and feature requests</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
              Profilo is built in the open. The best way to report bugs, request features, 
                or contribute is through our GitHub repository.
              </p>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline">
                <Github className="w-4 h-4 mr-2" />
                Visit GitHub Repository
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-muted/20 border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              For any other inquiries, you can reach out via email.
            </p>
            <a href="mailto:hello@profilo.example">
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                hello@profilo.example
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
