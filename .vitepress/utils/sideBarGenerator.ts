import dirTree, { DirectoryTree } from 'directory-tree';
import path from 'path';

const rootPath = path.resolve(__dirname, '../..');

interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
}

interface CustomDirectoryTree extends DirectoryTree {
  type: 'directory' | 'file';
  children?: CustomDirectoryTree[];
}

export function buildSideBarItem(relativePath: string): SidebarItem[] {
  const dirPath = path.join(rootPath, relativePath);

  // 获取目录树并禁用默认排序
  const dirs = dirTree(dirPath, {
    attributes: ['type'],
    extensions: /\.md$/,
  }) as CustomDirectoryTree;

  if (!dirs.children) return [];

  // 处理目录项并确保顺序
  return dirs.children
    .filter(item => item.type === 'directory')
    .map(directory => {
      const sidebarItem: SidebarItem = {
        text: directory.name,
        items: [],
      };

      if (directory.children) {
        // 处理文件项并排序
        sidebarItem.items = directory.children
          .filter(child => child.type === 'file')
          // 按文件名自然排序（关键点）
          .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
          .map(file => {
            // 保留文件名原始大小写（关键点）
            const fileName = file.name.replace(/\.md$/, '');
            // 生成正确的相对路径
            const relativeLink = path
              .relative(rootPath, file.path)
              .replace(/\\/g, '/') // 转换为 POSIX 路径
              .replace(/\.md$/, '');
            return {
              text: fileName,
              link: `/${relativeLink}`, // 确保路径前缀正确
            };
          });
      }

      return sidebarItem;
    });
}
// 定义侧边栏配置类型
type SidebarConfig = Record<string, SidebarItem[]>;

export function buildSideBar(paths: string[]): SidebarConfig {
  const sideBar: SidebarConfig = {}; // 明确类型为键值对对象
  for (const path of paths) {
    // 动态设置键名，例如 '/learn_frontend/css/' → sideBar['/learn_frontend/css/']
    sideBar[path] = buildSideBarItem(path);
  }
  return sideBar;
}
