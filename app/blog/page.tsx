"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Calendar, Eye, Heart, MessageCircle, Plus } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "첫 번째 프로젝트 회고: React로 만든 할 일 관리 앱",
    excerpt:
      "React를 처음 배우면서 만든 할 일 관리 앱 개발 과정과 배운 점들을 정리해보았습니다. 컴포넌트 설계부터 상태 관리까지...",
    content: "React를 처음 배우면서 만든 할 일 관리 앱 개발 과정과 배운 점들을 정리해보았습니다...",
    author: {
      name: "김개발",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "김개",
    },
    date: "2024-01-15",
    category: "개발",
    tags: ["React", "JavaScript", "프로젝트"],
    views: 234,
    likes: 18,
    comments: 7,
    readTime: "5분",
  },
  {
    id: 2,
    title: "알고리즘 스터디 3개월 후기",
    excerpt:
      "코딩테스트 준비를 위해 시작한 알고리즘 스터디 3개월간의 여정을 돌아보며, 성장한 점과 아쉬웠던 점들을 공유합니다...",
    content: "코딩테스트 준비를 위해 시작한 알고리즘 스터디 3개월간의 여정을 돌아보며...",
    author: {
      name: "박알고",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "박알",
    },
    date: "2024-01-12",
    category: "학습",
    tags: ["Algorithm", "Study", "CodingTest"],
    views: 189,
    likes: 25,
    comments: 12,
    readTime: "7분",
  },
  {
    id: 3,
    title: "동아리 해커톤 참가 후기",
    excerpt:
      "지난 주말에 열린 대학교 연합 해커톤에 참가했습니다. 48시간 동안 팀원들과 함께 아이디어를 구현하며 느낀 점들을...",
    content: "지난 주말에 열린 대학교 연합 해커톤에 참가했습니다...",
    author: {
      name: "이해커",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "이해",
    },
    date: "2024-01-10",
    category: "활동",
    tags: ["Hackathon", "TeamWork", "Experience"],
    views: 156,
    likes: 31,
    comments: 9,
    readTime: "6분",
  },
  {
    id: 4,
    title: "신입생을 위한 개발 환경 설정 가이드",
    excerpt:
      "개발을 처음 시작하는 신입생들을 위한 개발 환경 설정 가이드입니다. VS Code 설치부터 Git 설정까지 차근차근...",
    content: "개발을 처음 시작하는 신입생들을 위한 개발 환경 설정 가이드입니다...",
    author: {
      name: "최멘토",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "최멘",
    },
    date: "2024-01-08",
    category: "가이드",
    tags: ["Guide", "Setup", "Beginner"],
    views: 298,
    likes: 42,
    comments: 15,
    readTime: "10분",
  },
  {
    id: 5,
    title: "UI/UX 디자인 공부 시작하기",
    excerpt:
      "개발자로서 디자인 감각을 기르고 싶어 시작한 UI/UX 공부 과정을 공유합니다. 추천 도서와 온라인 강의, 실습 프로젝트까지...",
    content: "개발자로서 디자인 감각을 기르고 싶어 시작한 UI/UX 공부 과정을 공유합니다...",
    author: {
      name: "정디자인",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "정디",
    },
    date: "2024-01-05",
    category: "디자인",
    tags: ["UI/UX", "Design", "Learning"],
    views: 167,
    likes: 22,
    comments: 6,
    readTime: "8분",
  },
]

const categories = ["전체", "개발", "학습", "활동", "가이드", "디자인"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "개발":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "학습":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "활동":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "가이드":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "디자인":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      default:
        return "bg-cert-gray/20 text-cert-gray border-cert-gray/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cert-black via-cert-darker to-cert-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-cert-light mb-2">Blog</h1>
          </div>
          <p className="text-cert-gray">동아리 멤버들의 경험과 지식을 공유하는 공간입니다.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cert-gray w-4 h-4" />
            <Input
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cert-card border-cert-border text-cert-light placeholder:text-cert-gray focus:border-cert-red"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-cert-red hover:bg-cert-red/80 text-cert-light"
                    : "border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-cert-red to-red-700 hover:from-red-700 hover:to-cert-red text-cert-light shadow-lg hover:shadow-cert-red/25 transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            글쓰기
          </Button>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Card className="mb-10 hover:shadow-2xl hover:shadow-cert-red/20 transition-all duration-500 cursor-pointer border-2 border-cert-red/50 bg-cert-card transform hover:-translate-y-1">
            <CardHeader>
              <Badge className="w-fit bg-cert-red/20 text-cert-red border-cert-red/30 mb-2">Featured</Badge>
              <CardTitle className="text-2xl text-cert-light hover:text-cert-red transition-colors">
                {filteredPosts[0].title}
              </CardTitle>
              <CardDescription className="text-base text-cert-gray">{filteredPosts[0].excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border border-cert-border">
                    <AvatarImage src={filteredPosts[0].author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-cert-card text-cert-light">
                      {filteredPosts[0].author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-cert-light">{filteredPosts[0].author.name}</div>
                    <div className="text-sm text-cert-gray flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {filteredPosts[0].date}
                      <span>•</span>
                      {filteredPosts[0].readTime} 읽기
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-cert-gray">
                  <div className="flex items-center gap-1 hover:text-cert-light transition-colors">
                    <Eye className="w-4 h-4" />
                    {filteredPosts[0].views}
                  </div>
                  <div className="flex items-center gap-1 hover:text-cert-red transition-colors">
                    <Heart className="w-4 h-4" />
                    {filteredPosts[0].likes}
                  </div>
                  <div className="flex items-center gap-1 hover:text-cert-accent transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {filteredPosts[0].comments}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-xl hover:shadow-cert-red/10 transition-all duration-500 cursor-pointer group bg-cert-card border-cert-border hover:border-cert-red/30 transform hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                  <span className="text-sm text-cert-gray">{post.readTime} 읽기</span>
                </div>
                <CardTitle className="group-hover:text-cert-red transition-colors line-clamp-2 text-cert-light">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-cert-gray">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-cert-border/50 text-cert-gray hover:text-cert-light hover:border-cert-red/30 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border border-cert-border">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-cert-card text-cert-light text-xs">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-cert-light">{post.author.name}</div>
                      <div className="text-xs text-cert-gray flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-cert-gray">
                    <div className="flex items-center gap-1 hover:text-cert-light transition-colors">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1 hover:text-cert-red transition-colors">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1 hover:text-cert-accent transition-colors">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-cert-card/50 rounded-xl border border-cert-border">
            <MessageCircle className="w-16 h-16 text-cert-gray/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-cert-light mb-2">검색 결과가 없습니다</h3>
            <p className="text-cert-gray">다른 검색어나 카테고리를 시도해보세요.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              이전
            </Button>
            <Button variant="default" size="sm" className="bg-cert-red text-cert-light">
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              다음
            </Button>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "총 포스트", value: mockPosts.length },
            { title: "총 조회수", value: mockPosts.reduce((acc, post) => acc + post.views, 0) },
            { title: "총 좋아요", value: mockPosts.reduce((acc, post) => acc + post.likes, 0) },
            { title: "총 댓글", value: mockPosts.reduce((acc, post) => acc + post.comments, 0) },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-cert-card border-cert-border hover:border-cert-red/30 transition-all duration-300 hover:shadow-lg hover:shadow-cert-red/10 group"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-cert-red group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-cert-gray">{stat.title}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
