import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  
  // المتغيرات اللي مربوطة بالفورم
  taskObj: any = {
    title: '',
    description: ''
  };

  isEditMode: boolean = false; // عشان نعرف إحنا بنضيف ولا بنعدل

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  // دالة لجلب البيانات
  getAllTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  // دالة الحفظ (بتشتغل للإضافة وللتعديل)
  saveTask() {
    if (this.isEditMode) {
      // لو بنعدل
      this.taskService.updateTask(this.taskObj._id, this.taskObj).subscribe(() => {
        this.getAllTasks(); // تحديث الجدول
        this.resetForm();
      });
    } else {
      // لو بنضيف جديد
      this.taskService.addTask(this.taskObj).subscribe(() => {
        this.getAllTasks(); // تحديث الجدول
        this.resetForm();
      });
    }
  }

  // دالة لما تضغط على زرار التعديل
  onEdit(item: any) {
    this.taskObj = { ...item }; // خد نسخة من البيانات حطها في الفورم
    this.isEditMode = true;
  }

  // دالة المسح
  onDelete(id: string) {
    const isConfirm = confirm('Are you sure you want to delete this task?');
    if (isConfirm) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.getAllTasks();
      });
    }
  }

  // تنظيف الفورم
  resetForm() {
    this.taskObj = { title: '', description: '' };
    this.isEditMode = false;
  }
}