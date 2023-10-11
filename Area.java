

/*Name ; Aljo Joby
 * roll no. 08
 * Batch : S3 CSE B 
 * Experiment : Finding area of shapes using method overloading 
 * Date: 11-10-2023
 */






package aljo;

import java.util.Scanner;

public class Area {


		  
			public static double Area(double side)
			{
				
				double area = side *side;
				return area;
			}
			public static double Area(double length,double width)
			{
				 	double area =  length * width;
				 	return area;
				 	
			}
		public static double area(double radius)
		{ 
			  double PI = 3.14;
			 double area = PI *radius*radius;
			 return area;
		}
		
		public static void main(String[] args)
		{
			Scanner sc = new Scanner(System.in);
			System.out.println("Choose a shape");
			String shape = sc.nextLine();
			double result =0.0;
			switch(shape)
			{ 
			case "square":
			System.out.println("Enter the side of the square");
			double side = sc.nextDouble();
			result = Area(side);
			break;
			case "rectangle":
			System.out.println("Enter the length and width of the rectangle");
			double length = sc.nextDouble();
			double width = sc.nextDouble();
			result = Area(length,width);
			
			break;
			
			case "circle":
			
				  System.out.println("Enter the radius");
				  double radius = sc.nextDouble();
				  result = area(radius);
				  break;
			
				  default:
					  System.out.println("Error Occured");
					  
		}
			sc.close();
			System.out.println("the area of" +shape+"is" +result);
			
			
		

			 
		}

	}


