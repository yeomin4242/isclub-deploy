"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Tag,
  Search,
  Plus,
  Filter,
  Shield,
  Lock,
  Eye,
  Terminal,
  Zap,
} from "lucide-react";

const mockStudies = [
  {
    id: 1,
    title: "OWASP Top 10 2023 취약점 분석",
    date: "2024-01-15",
    author: "김보안",
    description:
      "최신 OWASP Top 10 취약점에 대한 상세 분석과 실제 공격 시나리오, 대응 방안을 정리한 자료입니다.",
    tags: ["OWASP", "Web Security", "Vulnerability"],
    attachments: [
      { name: "OWASP_Top10_2023_Analysis.pdf", type: "pdf", size: "3.2MB" },
      { name: "Exploit_Examples.zip", type: "zip", size: "1.8MB" },
    ],
    category: "Web Security",
    difficulty: "intermediate",
  },
  {
    id: 2,
    title: "Metasploit Framework 완전 정복",
    date: "2024-01-12",
    author: "이해커",
    description:
      "Metasploit을 활용한 모의해킹 기법과 실습 가이드. 초보자부터 고급자까지 단계별로 학습할 수 있습니다.",
    tags: ["Metasploit", "Penetration Testing", "Exploitation"],
    attachments: [
      { name: "Metasploit_Guide.pdf", type: "pdf", size: "5.1MB" },
      { name: "Lab_Environment.ova", type: "ova", size: "2.3GB" },
    ],
    category: "Penetration Testing",
    difficulty: "advanced",
  },
  {
    id: 3,
    title: "암호학 기초와 RSA 구현",
    date: "2024-01-10",
    author: "박암호",
    description:
      "현대 암호학의 기초 이론부터 RSA 알고리즘의 수학적 원리와 Python 구현까지 다룹니다.",
    tags: ["Cryptography", "RSA", "Python"],
    attachments: [
      { name: "Cryptography_Basics.pdf", type: "pdf", size: "2.7MB" },
      { name: "RSA_Implementation.py", type: "py", size: "15KB" },
    ],
    category: "Cryptography",
    difficulty: "beginner",
  },
  {
    id: 4,
    title: "디지털 포렌식 실무 가이드",
    date: "2024-01-08",
    author: "최포렌식",
    description:
      "Autopsy와 Volatility를 활용한 디지털 증거 수집과 분석 방법론을 실습 중심으로 설명합니다.",
    tags: ["Digital Forensics", "Autopsy", "Volatility"],
    attachments: [
      { name: "Forensics_Guide.pdf", type: "pdf", size: "4.5MB" },
      { name: "Sample_Evidence.dd", type: "dd", size: "512MB" },
    ],
    category: "Digital Forensics",
    difficulty: "intermediate",
  },
  {
    id: 5,
    title: "네트워크 보안 모니터링",
    date: "2024-01-05",
    author: "정네트워크",
    description:
      "Wireshark와 Snort를 활용한 네트워크 트래픽 분석과 침입 탐지 시스템 구축 방법을 다룹니다.",
    tags: ["Network Security", "Wireshark", "IDS"],
    attachments: [
      { name: "Network_Monitoring.pdf", type: "pdf", size: "3.8MB" },
      { name: "Snort_Rules.conf", type: "conf", size: "45KB" },
    ],
    category: "Network Security",
    difficulty: "intermediate",
  },
];

const categories = [
  "전체",
  "Web Security",
  "Penetration Testing",
  "Cryptography",
  "Digital Forensics",
  "Network Security",
  "Malware Analysis",
];
const difficulties = ["전체", "beginner", "intermediate", "advanced"];
const allTags = [
  "OWASP",
  "Web Security",
  "Vulnerability",
  "Metasploit",
  "Penetration Testing",
  "Exploitation",
  "Cryptography",
  "RSA",
  "Python",
  "Digital Forensics",
  "Autopsy",
  "Volatility",
  "Network Security",
  "Wireshark",
  "IDS",
  "Malware Analysis",
];

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredStudies = mockStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || study.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "전체" || study.difficulty === selectedDifficulty;
    const matchesTag =
      selectedTag === "all" ||
      selectedTag === "" ||
      study.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTag;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-cert-red" />;
      case "zip":
        return <FileText className="w-4 h-4 text-cert-accent" />;
      case "py":
        return <Terminal className="w-4 h-4 text-green-400" />;
      default:
        return <FileText className="w-4 h-4 text-cert-gray" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-50 text-green-600 border-green-200";
      case "intermediate":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "advanced":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Shield className="w-3 h-3" />;
      case "intermediate":
        return <Lock className="w-3 h-3" />;
      case "advanced":
        return <Zap className="w-3 h-3" />;
      default:
        return <Eye className="w-3 h-3" />;
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-blue-50 text-blue-600",
      "bg-green-50 text-green-600",
      "bg-purple-50 text-purple-600",
      "bg-orange-50 text-orange-600",
      "bg-pink-50 text-pink-600",
    ];
    return colors[tag.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Hub</h1>
          </div>
          <p className="text-gray-600">
            보안 연구 자료와 학습 리소스를 공유하는 공간입니다.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cert-red"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-gray-900"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-32 bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="난이도" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {difficulties.map((difficulty) => (
                  <SelectItem
                    key={difficulty}
                    value={difficulty}
                    className="text-gray-900"
                  >
                    {difficulty === "전체"
                      ? difficulty
                      : difficulty === "beginner"
                      ? "초급"
                      : difficulty === "intermediate"
                      ? "중급"
                      : "고급"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-cert-red hover:bg-cert-red/80 text-white">
              <Plus className="w-4 h-4 mr-2" />
              자료 업로드
            </Button>
          </div>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <Card
              key={study.id}
              className="bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(study.difficulty)}
                    >
                      {getDifficultyIcon(study.difficulty)}
                      <span className="ml-1">
                        {study.difficulty === "beginner"
                          ? "초급"
                          : study.difficulty === "intermediate"
                          ? "중급"
                          : "고급"}
                      </span>
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-600"
                    >
                      {study.category}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{study.date}</span>
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-cert-red transition-colors">
                  {study.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                  {study.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {study.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Attachments */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    첨부 파일
                  </h4>
                  {study.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(attachment.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {attachment.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-cert-red"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-700">
                        {study.author.slice(0, 2)}
                      </span>
                    </div>
                    <span className="font-medium">{study.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{study.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}

        {/* Study Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "총 자료",
              value: mockStudies.length,
              icon: FileText,
            },
            {
              title: "카테고리",
              value: categories.length - 1,
              icon: Tag,
            },
            {
              title: "첨부파일",
              value: mockStudies.reduce(
                (acc, study) => acc + study.attachments.length,
                0
              ),
              icon: Download,
            },
            {
              title: "연구진",
              value: new Set(mockStudies.map((s) => s.author)).size,
              icon: Terminal,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-cert-red group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-cert-red transition-colors">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {stat.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
