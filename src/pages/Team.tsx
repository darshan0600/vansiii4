import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "With over 10 years of experience in creative direction, Sarah leads our team with innovative vision and strategic thinking.",
    skills: ["Brand Strategy", "Art Direction", "Team Leadership"],
    social: {
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarahjcreative"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Michael specializes in front-end development and has a passion for creating seamless user experiences.",
    skills: ["React", "TypeScript", "UI/UX"],
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen"
    }
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Art Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    bio: "Emma brings creative concepts to life through her exceptional artistic vision and attention to detail.",
    skills: ["Digital Art", "Illustration", "Brand Design"],
    social: {
      instagram: "https://instagram.com/emmacreates"
    }
  },
  {
    id: 4,
    name: "David Kim",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "David crafts intuitive user interfaces and experiences that delight users and drive engagement.",
    skills: ["User Research", "Prototyping", "Visual Design"],
    social: {
      linkedin: "https://linkedin.com/in/davidkim"
    }
  },
  {
    id: 5,
    name: "Lisa Martinez",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    bio: "Lisa develops and executes marketing strategies that help our clients reach their target audience effectively.",
    skills: ["Digital Marketing", "Content Strategy", "Analytics"],
    social: {
      twitter: "https://twitter.com/lisammarketing"
    }
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "James oversees the technical aspects of our projects, ensuring robust and scalable solutions.",
    skills: ["System Architecture", "Backend Development", "DevOps"],
    social: {
      linkedin: "https://linkedin.com/in/jameswilson"
    }
  },
  {
    id: 7,
    name: "Anna Kowalski",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    bio: "Anna creates stunning motion graphics and animations that bring stories to life.",
    skills: ["After Effects", "3D Animation", "Video Editing"],
    social: {
      instagram: "https://instagram.com/annamotion"
    }
  },
  {
    id: 8,
    name: "Tom Anderson",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    bio: "Tom ensures smooth project execution through effective communication and resource management.",
    skills: ["Project Planning", "Team Coordination", "Client Relations"],
    social: {
      linkedin: "https://linkedin.com/in/tomanderson"
    }
  }
];

const TeamMemberModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="h-[400px]">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
            <p className="text-purple-600 mb-6">{member.role}</p>
            
            <p className="text-gray-600 mb-6">{member.bio}</p>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              {Object.entries(member.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-light mb-16 tracking-tighter text-center"
        >
          Meet the Team
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-8 h-8 text-white mb-2 mx-auto" />
                    <p className="text-white text-sm font-medium text-center">View Profile</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;