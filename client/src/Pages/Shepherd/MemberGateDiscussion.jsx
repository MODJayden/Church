import { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import {
  Send,
  ArrowLeft,
  Users,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Sample data - replace with your actual data
const currentGate = {
  id: 1,
  name: "Victory Gate",
  description: "Young adults ministry focused on spiritual growth",
  members: 24,
  image: "/gates/victory-gate.jpg", // Replace with actual image path
};

const discussionPosts = [
  {
    id: 1,
    author: "Michael Boateng",
    avatar: "/avatars/michael.jpg",
    content:
      "Has everyone prepared for our Bible study this Friday? I was thinking we could focus on Romans 12.",
    timestamp: "2023-06-15T09:30:00Z",
    replies: [
      {
        id: 101,
        author: "Abena Asare",
        avatar: "/avatars/abena.jpg",
        content:
          "Yes, I've been studying that chapter. Verse 2 really speaks to me about transformation.",
        timestamp: "2023-06-15T10:15:00Z",
      },
    ],
  },
  {
    id: 2,
    author: "Pastor John Mensah",
    avatar: "/avatars/john.jpg",
    content:
      "Reminder: Our outreach program has been moved to next Saturday. Please confirm your attendance.",
    timestamp: "2023-06-14T14:45:00Z",
    replies: [],
  },
];

const MemberGateDiscussion = () => {
  const [newPost, setNewPost] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discussionPosts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    // In a real app, you would send this to your backend
    console.log("New post:", newPost);
    setNewPost("");
  };

  const handleReplySubmit = (postId, e) => {
    e.preventDefault();
    if (replyContent.trim() === "") return;

    // In a real app, you would send this to your backend
    console.log(`Reply to post ${postId}:`, replyContent);
    setReplyContent("");
    setReplyTo(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Gate Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/gates">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3 text-blue-400">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentGate.image} />
              <AvatarFallback>{currentGate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{currentGate.name}</h1>
              <p className="text-gray-600 flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{currentGate.members} members</span>
              </p>
            </div>
          </div>
        </div>

        {/* Discussion Posts */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Gate Discussion
            </h2>
          </div>

          <div className="h-[calc(100vh-300px)] overflow-y-auto p-4 space-y-6">
            {discussionPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No discussions yet. Start a conversation!
              </div>
            ) : (
              discussionPosts.map((post) => (
                <div key={post.id} className="space-y-4">
                  {/* Main Post */}
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{post.author}</h3>
                            <p className="text-xs text-gray-500">
                              {formatDate(post.timestamp)}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Report</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="mt-2">{post.content}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 px-0 text-gray-500"
                          onClick={() =>
                            setReplyTo(replyTo === post.id ? null : post.id)
                          }
                        >
                          Reply
                        </Button>
                      </div>

                      {/* Reply Form */}
                      {replyTo === post.id && (
                        <form
                          onSubmit={(e) => handleReplySubmit(post.id, e)}
                          className="mt-3 flex gap-2"
                        >
                          <Input
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="flex-1"
                          />
                          <Button type="submit" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      )}

                      {/* Replies */}
                      {post.replies.length > 0 && (
                        <div className="ml-8 mt-3 space-y-3">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src={reply.avatar} />
                                <AvatarFallback>
                                  {reply.author.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between">
                                  <h4 className="text-sm font-semibold">
                                    {reply.author}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(reply.timestamp)}
                                  </p>
                                </div>
                                <p className="text-sm mt-1">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* New Post Form */}
          <div className="border-t p-4">
            <form onSubmit={handlePostSubmit} className="flex gap-2">
              <Input
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Start a new discussion..."
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberGateDiscussion;
